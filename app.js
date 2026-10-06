import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API Blog funcionando correctamente",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
