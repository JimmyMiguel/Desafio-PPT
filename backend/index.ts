import "./config.ts";
import express from "express";
import cors from "cors";
import { pool } from "./bd/bdNeon.ts";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Comprobar que el backend está vivo (desde el front)
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Crear tabla si no existe (ejecutar al iniciar)
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id UUID PRIMARY KEY,
        player1_name TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log("Tabla rooms lista");
  } catch (e) {
    console.error("Error al inicializar la base de datos:", e);
  }
}

// Endpoint: crear sala y guardar nombre del jugador
app.post("/rooms", async (req, res) => {
  try {
    const { roomId, name } = req.body;
    if (!roomId || !name) {
      return res.status(400).json({ error: "Faltan roomId o name" });
    }
    await pool.query(
      `INSERT INTO rooms (id, player1_name) VALUES ($1, $2)`,
      [roomId, name]
    );
    res.status(201).json({ roomId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al crear la sala" });
  }
});

// Endpoints adicionales los podés sumar acá
// app.get("/rooms/:id", ...)
// app.post("/rooms/:id/join", ...)

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
