import { Hono } from "hono";
import { getDb } from "../../../db/index";
import type { GetStatsResponse } from "./stats.api";

const statsRoute = new Hono();

statsRoute.get("/", (c) => {
	const db = getDb();

	const xWins = db
		.prepare("SELECT COUNT(*) as count FROM game WHERE winner = 'X'")
		.get() as { count: number };
	const oWins = db
		.prepare("SELECT COUNT(*) as count FROM game WHERE winner = 'O'")
		.get() as { count: number };
	const draws = db
		.prepare("SELECT COUNT(*) as count FROM game WHERE is_draw = 1")
		.get() as { count: number };

	const response: GetStatsResponse = {
		X: { wins: xWins.count, losses: oWins.count },
		O: { wins: oWins.count, losses: xWins.count },
		draws: draws.count,
	};
	return c.json(response);
});

export default statsRoute;
