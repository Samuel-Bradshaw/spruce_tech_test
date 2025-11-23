import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/v1/health", (c) => {
  return c.text("Helthy service.");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export type AppType = typeof app;
