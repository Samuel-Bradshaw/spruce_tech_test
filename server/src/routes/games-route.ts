import { createRoute, OpenAPIHono, type RouteHandler } from "@hono/zod-openapi";
import z from "zod";
import {
  errorResponseSchema,
  gameRoundSchema,
  gameStatsResponseSchema,
} from "../rest-schema.js";
import { toJsonBody } from "../utils/json-utils.js";
import { insertGameRound, updateGameWinner } from "../db/games-dal.js";

const createNewGameRequest = z.object({
  boardSideLength: z.number().min(3).max(15),
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
    400: toJsonBody(errorResponseSchema, "Bad request"),
  },
});
type CreateGameRoute = typeof createGameRoute;

const createGameHandler: RouteHandler<CreateGameRoute> = async (c) => {
  try {
    const body = createNewGameRequest.parse(await c.req.json());

    const gameRound = await insertGameRound(body.boardSideLength);

    return c.json(gameRound, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          error: "BAD_REQUEST",
          details: error.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
            code: e.code,
          })),
        },
        400,
      );
    }

    throw error;
  }
};

const updateGameWinnerRequest = z.object({
  gameId: z.string().uuid(),
  winner: z.enum(["X", "O", "TIE"]),
});

const updateGameWinnerRoute = createRoute({
  tags: ["Games"],
  method: "put",
  path: `/winner`,
  request: {
    body: toJsonBody(
      updateGameWinnerRequest,
      "Update game winner request body",
    ),
  },
  responses: {
    200: toJsonBody(gameRoundSchema, "Game winner updated successfully"),
    400: toJsonBody(errorResponseSchema, "Bad request"),
  },
});
type UpdateGameWinnerRoute = typeof updateGameWinnerRoute;

const updateGameWinnerHandler: RouteHandler<UpdateGameWinnerRoute> = async (
  c,
) => {
  try {
    const body = updateGameWinnerRequest.parse(await c.req.json());
    const updatedGameRound = await updateGameWinner(body.gameId, body.winner);
    return c.json(updatedGameRound, 200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          error: "BAD_REQUEST",
          details: error.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
            code: e.code,
          })),
        },
        400,
      );
    }
    throw error;
  }
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
  .openapi(getGameStatsRoute, getGameStatsHandler)
  .openapi(updateGameWinnerRoute, updateGameWinnerHandler);

export default gamesRouter;
