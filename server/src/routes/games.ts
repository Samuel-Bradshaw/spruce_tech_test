import { createRoute, OpenAPIHono, type RouteHandler } from "@hono/zod-openapi";
import z from "zod";
import { gameRoundSchema, gameStatsResponseSchema } from "../schema.js";
import { toJsonBody } from "../utils/json-utils.js";

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

const getGameStatsRoute = createRoute({
  tags: ["Games"],
  method: "get",
  path: `/stats`,
  responses: {
    200: toJsonBody(gameStatsResponseSchema, "Win/Loss game statistics"),
  },
});
type GetGameStatsRoute = typeof getGameStatsRoute;

const getGameStatsHandler: RouteHandler<GetGameStatsRoute> = async (c) => {
  return c.json(
    {
      totalGames: 42,
      playerXWins: 20,
      playerOWins: 15,
      totalDraws: 7,
    },
    200,
  );
};

const gamesRouter = new OpenAPIHono()
  .openapi(createGameRoute, createGameHandler)
  .openapi(getGameStatsRoute, getGameStatsHandler);

export default gamesRouter;
