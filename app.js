import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";


import { startDB } from "./src/config/database.js";
import "./src/models/index.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { tagRoutes } from "./src/routes/tag.routes.js";
import { articleRoutes } from "./src/routes/article.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/tags", tagRoutes);

app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API Blog funcionando correctamente",
  });
});

const startServer = async () => {
  await startDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();