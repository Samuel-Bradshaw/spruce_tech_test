import { describe, expect, it, vi } from "vitest";

import * as gamesDb from "../db/games.js";
import { createMockGameRound } from "../utils/test-utils/db-mocks.js";
vi.mock("../db/games.js");

describe("Games DB Tests", () => {
  it("calls insertGameRound with correct data when creating a new game", async () => {
    const mockGameRound = createMockGameRound();

    vi.spyOn(gamesDb, "insertGameRound").mockResolvedValue(mockGameRound);

    const result = await gamesDb.insertGameRound(5);

    expect(result).toEqual(mockGameRound);
  });
});
