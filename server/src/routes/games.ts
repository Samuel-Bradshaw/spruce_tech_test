import { createRoute, OpenAPIHono, type RouteHandler } from "@hono/zod-openapi";
import z from "zod";
import { gameRoundSchema } from "../schema.js";
import { toJsonBody } from "../json-utils.js";

const createNewGameRequest = z.object({
  boardSize: z.number().min(3).max(15).optional(),
});

const createGameRoute = createRoute({
  tags: ["Games"],
  method: "post",
  path: `/`,
  request: {
    body: toJsonBody(createNewGameRequest, "Create new game request body"),
  },
  responses: {
    201: toJsonBody(gameRoundSchema, "Game round created successfully"),
  },
});
type CreateGameRoute = typeof createGameRoute;

const createGameHandler: RouteHandler<CreateGameRoute> = async (c) => {
  const body = c.req.valid("json");
  const boardSize = body.boardSize ?? 3;

  return c.json(
    {
      id: crypto.randomUUID(),
      winner: null,
      boardSize,
      status: "IN_PROGRESS" as const,
    },
    201,
  );
};

const gamesRouter = new OpenAPIHono().openapi(
  createGameRoute,
  createGameHandler,
);
export default gamesRouter;
