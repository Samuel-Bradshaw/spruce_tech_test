import { OpenAPIHono } from "@hono/zod-openapi";

export function setupServer<const T extends Record<string, OpenAPIHono>>(
  routeMapping: T,
) {
  const app = new OpenAPIHono();

  let routes = app;
  for (const [basePath, router] of Object.entries(routeMapping)) {
    routes = routes.route(basePath, router) as any;
  }
  return routes;
}
