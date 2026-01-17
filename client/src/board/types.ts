export type XorO = 'X' | 'O';
/**
 * The state of the board as an immutable 1-D array.
 */
export type BoardState = readonly (XorO | undefined)[];

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
