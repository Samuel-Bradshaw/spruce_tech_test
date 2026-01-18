// Largely a copy of types.ts in the client folder,
// however I want to keep client and server code separate.
// Possibly if there was enough shared logic there could be a "common" folder/package
// with these typings in it.

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
