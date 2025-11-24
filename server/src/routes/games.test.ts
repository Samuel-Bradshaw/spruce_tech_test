import { serve, type ServerType } from "@hono/node-server";
import { hc } from "hono/client";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import * as gamesDb from "../db/games.js";
import { gameRoundSchema, gameStatsResponseSchema } from "../schema.js";
import { setupServer } from "../utils/server-utils.js";
import gamesRouter from "./games.js";
import { createMockGameRound } from "../utils/test-utils/db-mocks.js";

vi.mock("../db/games.js", () => ({
  insertGameRound: vi.fn(),
}));

describe("Games Resource", () => {
  const testApp = setupServer({
    "/": gamesRouter,
  });

  const client = hc<typeof testApp>("http://localhost:3001");

  let server: ServerType | undefined;
  beforeAll(async () => {
    server = serve(
      {
        fetch: testApp.fetch,
        port: 3001,
      },
      () => {},
    );
    // Wait to ensure server is ready
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  afterAll(() => {
    server?.close();
  });

  it("returns a new game on creation", async () => {
    const mockGameRound = createMockGameRound({ boardSize: 7 });

    vi.mocked(gamesDb.insertGameRound).mockResolvedValue(mockGameRound);

    const res = await client.index.$post({
      json: { boardSize: 7 },
    });
    const game = await res.json();

    expect(res.status).toBe(201);
    expect(gamesDb.insertGameRound).toHaveBeenCalledWith(7);
    console.log({ game });
    const result = gameRoundSchema.parse(game);
    expect(result.boardSize).toBe(7);
  });

  it("returns game stats for all games", async () => {
    const res = await client.stats.$get();
    const stats = await res.json();

    expect(res.status).toBe(200);
    expect(() => gameStatsResponseSchema.parse(stats)).not.toThrow();
  });

  it.skip("it registers a move successfully", () => {
    console.log("skipped");
  });

  it.skip("it returns the fastest for a player", () => {
    console.log("skipped");
  });
});
