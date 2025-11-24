import { describe, expect, it, vi } from "vitest";
import type { DbType } from "./client.js";

import * as gamesDb from "../db/games.js";
import { createMockGameRound } from "../utils/test-utils/db-mocks.js";
vi.mock("../db/games.js");

describe("Games DB Tests", () => {
  it("calls insertGameRound with correct data when creating a new game", async () => {
    const mockGameRound = createMockGameRound({
      boardSize: 5,
      status: "IN_PROGRESS",
      winner: null,
    });

    vi.spyOn(gamesDb, "insertGameRound").mockResolvedValue(mockGameRound);

    const result = await gamesDb.insertGameRound({
      boardSize: 5,
      status: "IN_PROGRESS",
    });

    expect(gamesDb.insertGameRound).toHaveBeenCalledWith(
      expect.objectContaining({
        boardSize: 5,
        status: "IN_PROGRESS",
      }),
    );
    expect(gamesDb.insertGameRound).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockGameRound);
  });
});
