import { OpenAPIHono } from "@hono/zod-openapi";

// type MergeRoutes<T extends Record<string, any>> =
//   T extends Record<string, infer R>
//     ? R extends OpenAPIHono<any, any, any>
//       ? R
//       : never
//     : never;
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
