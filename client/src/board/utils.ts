import { BoardState, XorO } from "../types";

/**
 * For the given board state, get the number of turns that have happened.
 */
export const getNumTurns = (grid: BoardState) => {
	return grid.filter((cell) => cell !== undefined).length;
}

/**
 * For the given board state, get which player should go next.
 */
export const getNextPlayer = (grid: BoardState, firstPlayer: XorO): XorO => {
	const secondPlayer = firstPlayer === "X" ? "O" : "X";
	const turns = getNumTurns(grid);
	return turns % 2 === 0 ? firstPlayer : secondPlayer;
}