import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import gamesRouter from "./routes/games.js";
import healthRouter from "./routes/health.js";

const app = new OpenAPIHono();

const routes = app
  .route("/api/v1/health", healthRouter)
  .route("/api/v1/games", gamesRouter);

export type AppType = typeof routes;

serve(
  {
    fetch: routes.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
