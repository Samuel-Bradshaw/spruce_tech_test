import { createRoute, OpenAPIHono, type RouteHandler } from "@hono/zod-openapi";
import { healthResponseSchema } from "../rest-schema.js";

const healthRoute = createRoute({
  tags: ["Health"],
  path: `/`,
  method: "get",
  responses: {
    200: {
      description: "Service is healthy",
      content: {
        "application/json": { schema: healthResponseSchema },
      },
    },
  },
});

const healthHandler: RouteHandler<typeof healthRoute> = async (c) => {
  return c.json({ status: "healthy" }, 200);
};

const healthRouter = new OpenAPIHono().openapi(healthRoute, healthHandler);
export default healthRouter;
