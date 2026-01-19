import type { Player } from "../players/types";

/**
 * Player type.
 */
export type XorO = "X" | "O";

// Could really get into the semantics of what a "type" is here.
// Feels like overkill to create a separate file JUST for this though.
/**
 * Draw is a special case,
 * means we can avoid using `"DRAW"`, `null`, `undefined` etc.
 */
export const DRAW = Symbol.for("DRAW");
export type Draw = typeof DRAW;

/**
 * The result of a game.
 * Can be X, O, or a draw.
 */
export type GameResult = XorO | Draw;

/**
 * The state of the board as an immutable 1-D array.
 */
export type BoardState = readonly (XorO | undefined)[];

export type GameSettings = {
	id: string;

	/**
	 * A number between 3 and 15.
	 */
	boardSize: number;

	/**
	 * Player that goes first in the game.
	 */
	firstPlayer: XorO;

	/**
	 * Player assigned to X.
	 */
	xPlayer: Player;

	/**
	 * Player assigned to O.
	 */
	oPlayer: Player;
};
