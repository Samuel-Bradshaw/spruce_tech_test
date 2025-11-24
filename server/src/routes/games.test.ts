import { serve, type ServerType } from "@hono/node-server";
import { hc } from "hono/client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { AppType } from "../index.js";
import { gameRoundSchema, gameStatsResponseSchema } from "../schema.js";
import { setupServer } from "../utils/server-utils.js";
import gamesRouter from "./games.js";

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
    const res = await client.index.$post({
      json: { boardSize: 3 },
    });
    const game = await res.json();

    expect(res.status).toBe(201);
    expect(() => gameRoundSchema.parse(game)).not.toThrow();
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
