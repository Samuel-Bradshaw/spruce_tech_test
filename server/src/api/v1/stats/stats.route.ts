import { Hono } from "hono";
import { getDb } from "../../../db/index";
import type { GetStatsResponse, TopPlayer } from "./stats.api";

const ANONYMOUS_NAME = "Anonymous";

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

	// Find top player by wins (excluding null users and Anonymous)
	const topPlayerRow = db
		.prepare(`
			SELECT u.name, COUNT(*) as wins FROM (
				SELECT user_x_id as user_id FROM game
				WHERE winner = 'X' AND user_x_id IS NOT NULL
				UNION ALL
				SELECT user_o_id as user_id FROM game
				WHERE winner = 'O' AND user_o_id IS NOT NULL
			) wins
			JOIN user u ON wins.user_id = u.id
			WHERE u.name != ?
			GROUP BY wins.user_id
			ORDER BY wins DESC
			LIMIT 1
		`)
		.get(ANONYMOUS_NAME) as { name: string; wins: number } | undefined;

	const topPlayer: TopPlayer | null = topPlayerRow
		? { name: topPlayerRow.name, wins: topPlayerRow.wins }
		: null;

	const response: GetStatsResponse = {
		xWins: xWins.count,
		oWins: oWins.count,
		draws: draws.count,
		topPlayer,
	};
	return c.json(response);
});

export default statsRoute;
