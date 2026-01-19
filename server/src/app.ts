import { Hono } from "hono";
import { cors } from "hono/cors";
import v1Routes from "./api/v1/routes";

const app = new Hono();

app.use(
	"/api/*",
	cors({
		// Obviously wouldn't have this hard-coded normally
		origin: "http://localhost:3001",
	}),
);

app.route("/api/v1", v1Routes);

export { app };
