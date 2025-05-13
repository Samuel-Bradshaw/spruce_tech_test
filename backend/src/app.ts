import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { initDb, closeDb } from "./db";
import router from "./routes";

const PORT = Number(process.env.PORT) || 3002;

/*--- Note ---
I would usually think a little more about the cors policy for security reasons
*/
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
};

(async () => {
  try {
    await initDb();

    const app = express();
    app.use((req, res, next) => {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
      );
      next();
    });
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use("/", router);

    const server = app.listen(PORT, () => {
      console.log(`TicTacToe API running on http://localhost:${PORT}`);
    });

    const shutdown = async () => {
      await closeDb();
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
