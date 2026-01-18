import { Hono } from "hono";

const app = new Hono();

app.get("/api/games", (c) => {
	return c.json({ games: [] });
});

export { app };
