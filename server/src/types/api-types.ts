import type { z } from "zod";
import type {
  createNewGameRequest,
  errorResponseSchema,
  gameSchema,
  gameStatusSchema,
  gameStatsSchema,
  healthResponseSchema,
  updateGameWinnerRequest,
  gameOutcomes,
  playerEnum,
} from "./zod-schema.js";

// Core types
export type HealthResponse = z.infer<typeof healthResponseSchema>;
export type GameRound = z.infer<typeof gameSchema>;
export type GameStatus = z.infer<typeof gameStatusSchema>;
export type GameStats = z.infer<typeof gameStatsSchema>;

// REST types
export type NewGameRequest = z.infer<typeof createNewGameRequest>;
export type UpdateGameWinnerRequest = z.infer<typeof updateGameWinnerRequest>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

// Type utils
export type XorO = z.infer<typeof playerEnum>;
export type GameOutcome = z.infer<typeof gameOutcomes>;
