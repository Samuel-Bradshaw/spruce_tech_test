import { serve } from "@hono/node-server";
import { env } from "./config/env.js";
import gamesRouter from "./routes/games.js";
import healthRouter from "./routes/health.js";
import { setupServer } from "./utils/server-utils.js";

const routeMapping = {
  "/api/v1/health": healthRouter,
  "/api/v1/games": gamesRouter,
};

const routes = setupServer(routeMapping);
export type AppType = typeof routes;

serve(
  {
    fetch: routes.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
  },
);
