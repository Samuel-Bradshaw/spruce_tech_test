import { hc } from "hono/client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { serve, type ServerType } from "@hono/node-server";
import healthRouter from "../routes/health.js";
import { setupServer } from "../utils/server-utils.js";
import { OpenAPIHono } from "@hono/zod-openapi";

describe("Health endpoint", () => {
  const testApp = new OpenAPIHono().route("/", healthRouter);

  const client = hc<typeof testApp>("http://localhost:9000");

  let server: ServerType | undefined;
  beforeAll(async () => {
    server = serve(
      {
        fetch: testApp.fetch,
        port: 9000,
      },
      () => {},
    );
    // Wait to ensure server is ready
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  afterAll(() => {
    server?.close();
  });

  it("should return a successful response", async () => {
    const res = await client.index.$get();

    expect(res.status).toBe(200);
  });

  it("should have correct content-type header", async () => {
    const res = await client.index.$get();

    expect(res.headers.get("content-type")).toContain("application/json");
  });
});
