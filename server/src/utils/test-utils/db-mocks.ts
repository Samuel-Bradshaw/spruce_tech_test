import type { GameRound } from "../../db/schema.js";

export function createMockGameRound(overrides?: Partial<GameRound>): GameRound {
  const defaultGameRound: GameRound = {
    id: crypto.randomUUID(),
    boardSize: 5,
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
