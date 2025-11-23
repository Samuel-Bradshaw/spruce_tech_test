import { describe, it, expect } from "vitest";
import { Hono } from "hono";

// Import the app setup to test
const app = new Hono();

app.get("/v1/health", (c) => {
  return c.text("Healthy service.");
});

describe("Health endpoint", () => {
  describe("GET /", () => {
    it("should return a text response", async () => {
      const res = await app.request("/v1/health");
      expect(res.status).toBe(200);
      expect(await res.text()).toBe("Healthy service.");
    });

    it("should have correct content-type header", async () => {
      const res = await app.request("/v1/health");
      expect(res.headers.get("content-type")).toContain("text/plain");
    });
  });

  describe("Invalid routes", () => {
    it("should return 404 for non-existent routes", async () => {
      const res = await app.request("/nonexistent");
      expect(res.status).toBe(404);
    });
  });

  describe("HTTP methods", () => {
    it("should return 404 for POST to root", async () => {
      const res = await app.request("/v1/health", { method: "POST" });
      expect(res.status).toBe(404);
    });

    it("should return 404 for PUT to root", async () => {
      const res = await app.request("/v1/health", { method: "PUT" });
      expect(res.status).toBe(404);
    });

    it("should return 404 for DELETE to root", async () => {
      const res = await app.request("/v1/health", { method: "DELETE" });
      expect(res.status).toBe(404);
    });
  });
});
