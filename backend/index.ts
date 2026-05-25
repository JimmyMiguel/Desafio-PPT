import "./config.ts";
import express from "express";
import cors from "cors";
import { sequelize } from "./bd/sequelize.ts";
import { Room } from "./models/Room.ts";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Comprobar que el backend está vivo (desde el front)
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Sincronizar modelos con la base de datos (crea tablas si no existen)
async function initDb() {
  try {
    await sequelize.sync();
    console.log("Base de datos lista (Sequelize)");
  } catch (e) {
    console.error("Error al inicializar la base de datos:", e);
  }
}

// POST /rooms - Crear sala y guardar nombre del jugador
app.post("/rooms", async (req, res) => {
  try {
    const { roomId, name } = req.body;
    if (!roomId || !name) {
      return res.status(400).json({ error: "Faltan roomId o name" });
    }
    await Room.create({
      id: roomId,
      player1_name: name,
    });
    res.status(201).json({ roomId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al crear la sala" });
  }
});

// GET /rooms/:id - Obtener una sala por id
app.get("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }
    res.json({
      id: room.id,
      player1_name: room.player1_name,
      created_at: room.createdAt,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener la sala" });
  }
});

// GET /rooms - Listar todas las salas (opcional)
app.get("/rooms", async (_req, res) => {
  try {
    const rooms = await Room.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(
      rooms.map((r) => ({
        id: r.id,
        player1_name: r.player1_name,
        created_at: r.createdAt,
      }))
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al listar salas" });
  }
});

async function start() {
  await initDb();
  const server = app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Backend en http://localhost:${PORT}`);
  });

  server.once("error", (err: unknown) => {
    const e = err as { code?: string };
    if (e.code === "EADDRINUSE") {
      console.error(
        `\n⚠️  El puerto ${PORT} está en uso. Para liberarlo, en otra terminal ejecutá:\n   lsof -ti :${PORT} | xargs kill\n   Luego volvé a correr: yarn dev\n`
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}

start().catch(console.error);
