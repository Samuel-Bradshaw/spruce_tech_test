import type { GameRow } from "../game/game.model";
import type { XorO } from "../types";
import type { UserGameSummary } from "./user.api";

export type UserRow = {
	id: string;
	name: string;
	created_at: number;
};

export const gameRowsToUserGames = (
	userId: string,
	gameRows: GameRow[],
): UserGameSummary[] =>
	gameRows.map((g) => ({
		id: g.id,
		boardSize: g.board_size,
		winner: g.winner as XorO | null,
		isDraw: g.is_draw === null ? null : !!g.is_draw,
		playedAs: g.user_x_id === userId ? "X" : "O",
		createdAt: g.created_at,
	}));
