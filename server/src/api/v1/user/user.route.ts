import { Hono } from "hono";
import { getDb } from "../../../db/index";
import type { GameRow } from "../game/game.model";
import type {
	CreateUserRequest,
	CreateUserResponse,
	DeleteUserResponse,
	GetAllUsersResponse,
	GetUserGamesResponse,
	GetUserResponse,
	GetUserStatsResponse,
} from "./user.api";
import { gameRowsToUserGames, type UserRow } from "./user.model";

const userRoute = new Hono();

userRoute.get("/", (c) => {
	const db = getDb();
	const users = db
		.prepare("SELECT * FROM user ORDER BY created_at DESC")
		.all() as UserRow[];

	const response: GetAllUsersResponse = {
		users: users.map((u) => ({
			id: u.id,
			name: u.name,
			createdAt: u.created_at,
		})),
	};
	return c.json(response);
});

userRoute.get("/:id", (c) => {
	const db = getDb();
	const id = c.req.param("id");
	const user = db.prepare("SELECT * FROM user WHERE id = ?").get(id) as
		| UserRow
		| undefined;

	if (!user) {
		return c.json({ error: "User not found" }, 404);
	}

	const response: GetUserResponse = {
		id: user.id,
		name: user.name,
		createdAt: user.created_at,
	};
	return c.json(response);
});

userRoute.post("/", async (c) => {
	const db = getDb();
	const body = await c.req.json<CreateUserRequest>();

	db.prepare("INSERT INTO user (id, name) VALUES (?, ?)").run(
		body.id,
		body.name,
	);

	const user = db
		.prepare("SELECT * FROM user WHERE id = ?")
		.get(body.id) as UserRow;

	const response: CreateUserResponse = {
		id: user.id,
		name: user.name,
		createdAt: user.created_at,
	};
	return c.json(response, 201);
});

userRoute.get("/:id/games", (c) => {
	const db = getDb();
	const id = c.req.param("id");

	const gameRows = db
		.prepare(
			"SELECT * FROM game WHERE user_x_id = ? OR user_o_id = ? ORDER BY created_at DESC",
		)
		.all(id, id) as GameRow[];

	const response: GetUserGamesResponse = {
		games: gameRowsToUserGames(id, gameRows),
	};
	return c.json(response);
});

userRoute.get("/:id/stats", (c) => {
	const db = getDb();
	const id = c.req.param("id");

	const winsAsX = db
		.prepare(
			"SELECT COUNT(*) as count FROM game WHERE user_x_id = ? AND winner = 'X'",
		)
		.get(id) as { count: number };
	const winsAsO = db
		.prepare(
			"SELECT COUNT(*) as count FROM game WHERE user_o_id = ? AND winner = 'O'",
		)
		.get(id) as { count: number };
	const lossesAsX = db
		.prepare(
			"SELECT COUNT(*) as count FROM game WHERE user_x_id = ? AND winner = 'O'",
		)
		.get(id) as { count: number };
	const lossesAsO = db
		.prepare(
			"SELECT COUNT(*) as count FROM game WHERE user_o_id = ? AND winner = 'X'",
		)
		.get(id) as { count: number };
	const draws = db
		.prepare(
			"SELECT COUNT(*) as count FROM game WHERE (user_x_id = ? OR user_o_id = ?) AND is_draw = 1",
		)
		.get(id, id) as { count: number };

	const response: GetUserStatsResponse = {
		wins: winsAsX.count + winsAsO.count,
		losses: lossesAsX.count + lossesAsO.count,
		draws: draws.count,
	};
	return c.json(response);
});

userRoute.delete("/:id", async (c) => {
	const db = getDb();
	const id = c.req.param("id");

	const user = db.prepare("SELECT * FROM user WHERE id = ?").get(id);
	if (!user) {
		return c.json({ error: "User not found" }, 404);
	}

	db.prepare("DELETE FROM user WHERE id = ?").run(id);

	const response: DeleteUserResponse = { success: true };

	return c.json(response);
});

export default userRoute;
