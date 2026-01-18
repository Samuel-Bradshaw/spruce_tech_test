import type { BoardState } from "./types";

/**
 * Creates a BoardState from a 2D array representation.
 * Use "X", "O", or null/undefined for empty cells.
 */
export const board = (rows: (string | null | undefined)[][]): BoardState =>
	rows.flat().map((c) => (c === "X" || c === "O" ? c : undefined));

export const EMPTY_BOARD = board([
	[null, null, null],
	[null, null, null],
	[null, null, null],
]);

export const DRAW_BOARD = board([
	["X", "O", "X"],
	["X", "X", "O"],
	["O", "X", "O"],
]);

// Row wins
export const X_WINS_TOP_ROW = board([
	["X", "X", "X"],
	["O", "O", null],
	[null, null, null],
]);

export const X_WINS_MIDDLE_ROW = board([
	["O", "O", null],
	["X", "X", "X"],
	[null, null, null],
]);

export const X_WINS_BOTTOM_ROW = board([
	["O", "O", null],
	[null, null, null],
	["X", "X", "X"],
]);

// Column wins
export const O_WINS_LEFT_COL = board([
	["O", "X", "X"],
	["O", "X", null],
	["O", null, null],
]);

export const O_WINS_MIDDLE_COL = board([
	["X", "O", "X"],
	[null, "O", null],
	[null, "O", null],
]);

export const O_WINS_RIGHT_COL = board([
	["X", "X", "O"],
	[null, null, "O"],
	[null, null, "O"],
]);

// Diagonal wins
export const X_WINS_DIAGONAL = board([
	["X", "O", null],
	["O", "X", null],
	[null, null, "X"],
]);

export const X_WINS_ANTI_DIAGONAL = board([
	["O", "O", "X"],
	[null, "X", null],
	["X", null, null],
]);
