import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { env } from "./config/env.js";
import gamesRouter from "./routes/games-route.js";
import healthRouter from "./routes/health.js";

const app = new OpenAPIHono();

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
