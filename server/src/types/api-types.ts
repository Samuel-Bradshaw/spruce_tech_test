import type { z } from "zod";
import type {
  boardSchema,
  createNewGameRequest,
  errorResponseSchema,
  gameOutcomes,
  gameSchema,
  gameStatsSchema,
  gameStatusSchema,
  healthResponseSchema,
  playerEnum,
  registerMoveRequest,
  updateGameWinnerRequest,
} from "./zod-schema.js";

// Core types
export type HealthResponse = z.infer<typeof healthResponseSchema>;
export type GameRound = z.infer<typeof gameSchema>;
export type GameStatus = z.infer<typeof gameStatusSchema>;
export type GameStats = z.infer<typeof gameStatsSchema>;

export type XorO = z.infer<typeof playerEnum>;
export type GameResult = z.infer<typeof gameOutcomes>;

// REST types
export type NewGameRequest = z.infer<typeof createNewGameRequest>;
export type UpdateGameWinnerRequest = z.infer<typeof updateGameWinnerRequest>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type RegisterMoveRequest = z.infer<typeof registerMoveRequest>;
export type Board = z.infer<typeof boardSchema>;
