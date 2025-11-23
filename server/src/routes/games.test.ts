import { describe, it, expect } from "vitest";
import { hc } from "hono/client";
import type { AppType } from "../index.js";
import { gameRoundSchema, gameStatsResponseSchema } from "../schema.js";

const client = hc<AppType>("http://localhost:3000");

describe("Games Resource", () => {
  it("returns a new game on creation", async () => {
    const res = await client.api.v1.games.$post({
      json: { boardSize: 3 },
    });
    const game = await res.json();

    expect(res.status).toBe(201);
    expect(() => gameRoundSchema.parse(game)).not.toThrow();
  });

  it("returns game stats for all games", async () => {
    const res = await client.api.v1.games.stats.$get();
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
