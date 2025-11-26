import { createRoute, OpenAPIHono, type RouteHandler } from "@hono/zod-openapi";
import z from "zod";
import {
  boardSchema,
  createNewGameRequest,
  errorResponseSchema,
  gameSchema,
  gameStatsSchema,
  registerMoveRequest,
  updateGameWinnerRequest,
} from "../types/zod-schema.js";
import { toJsonBody } from "../utils/json-utils.js";
import {
  getAllGames,
  insertGameMove,
  insertGame,
  updateGameWinner,
} from "../db/games-dal.js";
import { calculateGameStats } from "../utils/game-utils.js";

const createGameRoute = createRoute({
  tags: ["Games"],
  method: "post",
  path: `/`,
  request: {
    body: toJsonBody(createNewGameRequest, "Create new game request body"),
  },
  responses: {
    201: toJsonBody(gameSchema, "Game round created successfully"),
    400: toJsonBody(errorResponseSchema, "Bad request"),
  },
});

const createGameHandler: RouteHandler<typeof createGameRoute> = async (c) => {
  try {
    const body = createNewGameRequest.parse(await c.req.json());
    const gameRound = await insertGame(body.boardSideLength);

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
    200: toJsonBody(gameSchema, "Game winner updated successfully"),
    400: toJsonBody(errorResponseSchema, "Bad request"),
  },
});

const updateGameWinnerHandler: RouteHandler<
  typeof updateGameWinnerRoute
> = async (c) => {
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
    200: toJsonBody(gameStatsSchema, "Win/Loss game statistics"),
  },
});

const getGameStatsHandler: RouteHandler<typeof getGameStatsRoute> = async (
  c,
) => {
  const allGames = await getAllGames();
  const stats = calculateGameStats(allGames);
  return c.json(stats, 200);
};

const registerMoveToGameRoute = createRoute({
  tags: ["Games"],
  method: "post",
  path: `/:gameId/move`,
  request: {
    body: toJsonBody(registerMoveRequest, "Register move request body"),
  },
  responses: {
    201: toJsonBody(boardSchema, "Move registered successfully"),
    400: toJsonBody(errorResponseSchema, "Bad request"),
  },
});

type RegisterMoveToGameRoute = typeof registerMoveToGameRoute;
const registerMoveToGameHandler: RouteHandler<RegisterMoveToGameRoute> = async (
  c,
) => {
  try {
    const body = registerMoveRequest.parse(await c.req.json());
    const addedMove = await insertGameMove({
      gameId: c.req.param().gameId,
      lastPlayer: body.player,
      lastPlayedPosition: body.positionPlayed,
      boardState: body.board,
    });

    return c.json({ boardState: addedMove.boardState }, 201);
  } catch (error) {
    ({ error });
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

const gamesRouter = new OpenAPIHono()
  .openapi(createGameRoute, createGameHandler)
  .openapi(getGameStatsRoute, getGameStatsHandler)
  .openapi(updateGameWinnerRoute, updateGameWinnerHandler)
  .openapi(registerMoveToGameRoute, registerMoveToGameHandler);
export default gamesRouter;
