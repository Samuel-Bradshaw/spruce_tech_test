import { vi } from "vitest";
import type { DbType } from "../../db/client.js";
import type { GameRound } from "../../db/schema.js";

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
