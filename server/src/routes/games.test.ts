import { describe, it, expect } from "vitest";
import { hc } from "hono/client";
import type { AppType } from "../index.js";
import { gameRoundSchema } from "../schema.js";

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
});
