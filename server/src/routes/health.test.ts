import { hc } from "hono/client";
import type { AppType } from "../index.js";
import { describe, expect, it } from "vitest";

const client = hc<AppType>("http://localhost:3000");

describe("Health endpoint", () => {
  it("should return a successful response", async () => {
    const res = await client.api.v1.health.$get();

    expect(res.status).toBe(200);
  });

  it("should have correct content-type header", async () => {
    const res = await client.api.v1.health.$get();

    expect(res.headers.get("content-type")).toContain("application/json");
  });
});
