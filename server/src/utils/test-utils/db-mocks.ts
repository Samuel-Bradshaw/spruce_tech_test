import type { GameMove } from "../../db/schema.js";
import type { GameRound, GameStats } from "../../types/api-types.js";

export function createMockGameRound(overrides?: Partial<GameRound>): GameRound {
  const defaultGameRound: GameRound = {
    id: crypto.randomUUID(),
    boardSize: 9,
    winner: null,
    status: "IN_PROGRESS",
    createdAt: new Date(),
    completedAt: null,
  };

  return {
    ...defaultGameRound,
    ...overrides,
  };
}

export function createMockGameStats(overrides?: Partial<GameStats>): GameStats {
  const defaultStats: GameStats = {
    totalGames: 0,
    playerXWins: 0,
    playerOWins: 0,
    totalDraws: 0,
  };

  return {
    ...defaultStats,
    ...overrides,
  };
}

export function createMockGameMove(overrides?: Partial<GameMove>): GameMove {
  const gameMove: GameMove = {
    id: "string",
    gameId: "string",
    lastPlayer: "X",
    lastPlayedPosition: 4,
    boardState: Array(9).fill(null),
    createdAt: new Date(),
  };
  const mockRounds = {
    ...gameMove,
    ...overrides,
  };
  return mockRounds;
}
