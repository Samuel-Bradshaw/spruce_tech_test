import { createRoute, OpenAPIHono, type RouteHandler } from "@hono/zod-openapi";
import z from "zod";
import {
  errorResponseSchema,
  gameRoundSchema,
  gameStatsSchema,
} from "../rest-schema.js";
import { toJsonBody } from "../utils/json-utils.js";
import {
  getAllGames,
  insertGameMove,
  insertGame,
  updateGameWinner,
} from "../db/games-dal.js";
import { calculateGameStats } from "../utils/game-utils.js";

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
    200: toJsonBody(gameStatsSchema, "Win/Loss game statistics"),
  },
});

type GetGameStatsRoute = typeof getGameStatsRoute;
const getGameStatsHandler: RouteHandler<GetGameStatsRoute> = async (c) => {
  const allGames = await getAllGames();
  const stats = calculateGameStats(allGames);
  return c.json(stats, 200);
};

const registerMoveRequest = z.object({
  player: z.enum(["X", "O"]),
  positionPlayed: z.int().nonnegative(),
  board: z.array(z.enum(["X", "O"]).nullable()),
});

const boardSchema = z.object({
  boardState: z.array(z.enum(["X", "O"]).nullable()),
});
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
