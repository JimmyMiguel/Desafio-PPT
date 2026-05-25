import { Sequelize } from "sequelize";

const url = process.env.NEON_DATABASE_URL;
if (!url) {
  throw new Error(
    "NEON_DATABASE_URL no está definida. Crea un archivo .env en bd/ con la variable NEON_DATABASE_URL."
  );
}

export const sequelize = new Sequelize(url, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
