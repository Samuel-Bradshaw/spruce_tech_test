// Duplicated XorO from types.ts in the client folder,
// however I want to keep client and server code separate.
// Possibly if there was enough shared logic there could be a "common" folder/package
// with these typings in it.

/**
 * Player type.
 */
export type XorO = "X" | "O";

/**
 * Game data as returned by the API.
 */
export type GameData = {
	id: string;
	boardSize: number;
	firstPlayer: XorO;
	winner: XorO | null;
	isDraw: boolean | null;
	userXId: string | null;
	userOId: string | null;
	createdAt: number;
};
