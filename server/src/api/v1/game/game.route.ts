import { Hono } from "hono";

const gameRoute = new Hono();

gameRoute.get("/", (c) => c.json({ games: [] }));

export default gameRoute;
