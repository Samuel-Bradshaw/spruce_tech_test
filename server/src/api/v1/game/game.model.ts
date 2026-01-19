import type { GameData, XorO } from "../types";

export type GameRow = {
	id: string;
	created_at: number;
	board_size: number;
	first_player: string;
	winner: string | null;
	is_draw: number | null;
	user_x_id: string;
	user_o_id: string;
};

export const toGameData = (row: GameRow): GameData => ({
	id: row.id,
	boardSize: row.board_size,
	firstPlayer: row.first_player as XorO,
	winner: row.winner as XorO | null,
	isDraw: row.is_draw === null ? null : row.is_draw === 1,
	userXId: row.user_x_id,
	userOId: row.user_o_id,
	createdAt: row.created_at,
});
