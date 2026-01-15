import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference, Scalar } from "@scalar/hono-api-reference";

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

export function configureOpenAPI(app: OpenAPIHono) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      title: "Tic-Tac-toe API",
      version: "0.1.0",
    },
  });

  app.get(
    "/reference",
    Scalar({
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      url: "/docs",
    }),
  );
}
