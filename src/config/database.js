import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

export const startDB = async () => {
  try {
    await sequelize.authenticate();

    console.log("Conexión a MySQL establecida correctamente");
  } catch (error) {
    console.error("Error al conectar con MySQL:", error.message);
    process.exit(1);
  }
};
