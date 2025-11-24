import { OpenAPIHono } from "@hono/zod-openapi";

// extends multiple routes of server into single type
type MergeRoutes<T extends Record<string, OpenAPIHono>> = T[keyof T];

export function setupServer<const T extends Record<string, OpenAPIHono>>(
  routeMapping: T,
) {
  const app = new OpenAPIHono();

  let routes: any = app;
  for (const [basePath, router] of Object.entries(routeMapping)) {
    routes = routes.route(basePath, router);
  }
  return routes as MergeRoutes<T>;
}
