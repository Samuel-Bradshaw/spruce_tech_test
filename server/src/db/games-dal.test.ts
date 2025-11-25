import { describe, expect, it, vi } from "vitest";

import * as gamesDb from "./games-dal.js";
import { createMockGameRound } from "../utils/test-utils/db-mocks.js";
vi.mock("../db/games-dal.js");

describe("Games DB Tests", () => {
  it("calls insertGameRound with correct data when creating a new game", async () => {
    const mockGameRound = createMockGameRound();

    vi.spyOn(gamesDb, "insertGameRound").mockResolvedValue(mockGameRound);

    const result = await gamesDb.insertGameRound(5);

    expect(result).toEqual(mockGameRound);
  });

  it("updates a game with a winner successfully", async () => {
    const mockGameRound = createMockGameRound({
      winner: "X",
      completedAt: new Date(),
      status: "COMPLETED",
    });

    vi.spyOn(gamesDb, "updateGameWinner").mockResolvedValue({
      ...mockGameRound,
      winner: "X",
      completedAt: new Date(),
    });

    const result = await gamesDb.updateGameWinner(mockGameRound.id, "X");

    expect(result.winner).toBe("X");
    expect(result.status).toBe("COMPLETED");
  });
});
