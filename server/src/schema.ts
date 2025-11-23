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

export const gameRoundSchema = z
  .object({
    id: z.string().uuid(),
    winner: z.string().nullable(),
    boardSize: z.number().min(3).max(15),
    status: gameRoundStatusSchema,
  })
  .openapi({
    type: "object",
    title: "GameRound",
    description: "A round of a tic-tac-toe game with its status",
  });
