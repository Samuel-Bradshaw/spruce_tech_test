import { serve } from "@hono/node-server";
import { env } from "./config/env.js";
import gamesRouter from "./routes/games-route.js";
import healthRouter from "./routes/health.js";
import { setupServer } from "./utils/server-utils.js";

const routeMap = {
  "/api/v1/health": healthRouter,
  "/api/v1/games": gamesRouter,
};

const routes = setupServer(routeMap);

serve(
  {
    fetch: routes.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
  },
);

export default routes;

// Export types, and AppType for RPC client
export type AppType = typeof routes;
export * from "./types/api-types.js";
