import { z } from "@hono/zod-openapi";
import { MAX_BOARD_SIZE, MIN_BOARD_SIZE } from "../config/constants.js";

export const healthResponseSchema = z
  .object({
    status: z.string(),
  })
  .openapi({
    title: "HealthResponse",
    description: "A simple health check response",
  });

export const gameStatusSchema = z.enum(["IN_PROGRESS", "COMPLETED"]).openapi({
  type: "string",
  title: "GameRoundStatus",
  description: "The status of a game round",
});

export const playerEnum = z.enum(["X", "O"]);
export const gameOutcomes = z.union([playerEnum, z.literal("TIE")]);

export const gameSchema = z
  .object({
    id: z.string().uuid(),
    winner: gameOutcomes.nullable(),
    boardSize: z.number().min(MIN_BOARD_SIZE).max(MAX_BOARD_SIZE),
    status: gameStatusSchema,
    createdAt: z.coerce.date(),
    completedAt: z.coerce.date().nullable(),
  })
  .openapi({
    type: "object",
    title: "GameRound",
    description: "A round of a tic-tac-toe game with its status",
  });

export const gameStatsSchema = z
  .object({
    totalGames: z.number().min(0),
    playerXWins: z.number().min(0),
    playerOWins: z.number().min(0),
    totalDraws: z.number().min(0),
  })
  .openapi({
    type: "object",
    title: "GameStats",
    description: "Statistics about the games played",
  });

export const errorResponseSchema = z.object({
  error: z.string(),
  details: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
      code: z.string(),
    }),
  ),
});

export const createNewGameRequest = z.object({
  boardSideLength: z.number().min(3).max(15),
});

export const updateGameWinnerRequest = z.object({
  gameId: z.string().uuid(),
  winner: gameOutcomes,
});
