import type { XorO } from "../types";

export type Game = {
	id: string;
	createdAt: Date;
	boardSize: number;
	firstPlayer: XorO;
	winner: XorO | null;
	isDraw: 0 | 1 | null;
	userXId: string;
	userOId: string;
};
