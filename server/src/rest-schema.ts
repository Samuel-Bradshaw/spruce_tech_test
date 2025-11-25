import { z } from "@hono/zod-openapi";

export const healthResponseSchema = z
  .object({
    status: z.string(),
  })
  .openapi({
    title: "HealthResponse",
    description: "A simple health check response",
  });

export const gameRoundStatusSchema = z
  .enum(["IN_PROGRESS", "COMPLETED"])
  .openapi({
    type: "string",
    title: "GameRoundStatus",
    description: "The status of a game round",
  });

const MIN_BOARD_SIZE = 3 * 3;
const MAX_BOARD_SIZE = 15 * 15;

export const gameRoundSchema = z
  .object({
    id: z.string().uuid(),
    winner: z.string().nullable(),
    boardSize: z.number().min(MIN_BOARD_SIZE).max(MAX_BOARD_SIZE),
    status: gameRoundStatusSchema,
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
    title: "GameStatsResponse",
    description: "Statistics about the games played",
  });

export type GameStats = z.infer<typeof gameStatsSchema>;

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
