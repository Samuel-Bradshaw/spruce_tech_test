import { vi } from "vitest";
import type { DbType } from "../../db/client.js";
import type { GameMove, GameRound } from "../../db/schema.js";
import type { GameStats } from "../../rest-schema.js";

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

export function mockDbInsert(db: DbType, returnValue: GameRound | GameRound[]) {
  const mockReturning = vi
    .fn()
    .mockResolvedValue(
      Array.isArray(returnValue) ? returnValue : [returnValue],
    );
  const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
  const mockInsert = vi.fn().mockReturnValue({ values: mockValues });

  db.insert = mockInsert;

  return { mockInsert, mockValues, mockReturning };
}

export function mockGameMove(overrides?: Partial<GameMove>): GameMove {
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
