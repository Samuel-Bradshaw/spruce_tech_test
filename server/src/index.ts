import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { env } from "./env.js";
import gamesRouter from "./routes/games-route.js";
import healthRouter from "./routes/health.js";

const app = new OpenAPIHono();

// Use only in localhost, very permissive CORS policy
app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
  }),
);

export const routes = app
  .route("/api/v1/health", healthRouter)
  .route("/api/v1/games", gamesRouter);

serve(
  {
    fetch: routes.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
  },
);

export type AppType = typeof routes;
