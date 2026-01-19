import { Hono } from "hono";
import { getDb } from "../../../db/index";
import type {
	CreateGameRequest,
	CreateGameResponse,
	GetAllGamesResponse,
	GetGameResponse,
} from "./game.api";
import { type GameRow, toGameData } from "./game.model";

const gameRoute = new Hono();

gameRoute.get("/", (c) => {
	const db = getDb();
	const games = db
		.prepare("SELECT * FROM game ORDER BY created_at DESC")
		.all() as GameRow[];

	const response: GetAllGamesResponse = {
		games: games.map(toGameData),
	};
	return c.json(response);
});

gameRoute.get("/:id", (c) => {
	const db = getDb();
	const id = c.req.param("id");
	const game = db.prepare("SELECT * FROM game WHERE id = ?").get(id) as
		| GameRow
		| undefined;

	if (!game) {
		return c.json({ error: "Game not found" }, 404);
	}

	const response: GetGameResponse = toGameData(game);
	return c.json(response);
});

gameRoute.post("/", async (c) => {
	const db = getDb();
	const body = await c.req.json<CreateGameRequest>();

	db.prepare(`
		INSERT INTO game (id, board_size, first_player, winner, is_draw, user_x_id, user_o_id)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`).run(
		body.id,
		body.boardSize,
		body.firstPlayer,
		body.winner,
		body.isDraw === null ? null : body.isDraw ? 1 : 0,
		body.userXId,
		body.userOId,
	);

	const game = db
		.prepare("SELECT * FROM game WHERE id = ?")
		.get(body.id) as GameRow;

	// For testing UI when saving is pending
	await new Promise((res) => setTimeout(res, 2_000));

	return c.json<CreateGameResponse>(toGameData(game), 201);
});

export default gameRoute;
