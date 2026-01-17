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

/**
 * An array of indexes representing a winning line.
 */
type WinningLine = number[];

/**
 * For the given board size (where 3 corresponds to 3x3, 4 to 4x4 etc),
 * generate the winning lines on the board.
 * 
 * Each line is an array with length matching the boardSize,
 * where each element is an index of the board's array.
 * 
 * There will be a winning line for each diagonal,
 * each row, and each column.
 */
export const getWinningLines = (boardSize: number): WinningLine[] => {
	const lines: WinningLine[] = [];

	// Rows
	for (let r = 0; r < boardSize; r++) {
		const row: number[] = [];
		for (let c = 0; c < boardSize; c++) {
			row.push(r * boardSize + c);
		}
		lines.push(row);
	}

	// Columns
	for (let c = 0; c < boardSize; c++) {
		const col: number[] = [];
		for (let r = 0; r < boardSize; r++) {
			col.push(r * boardSize + c);
		}
		lines.push(col);
	}

	// Diagonal (top-left -> bottom-right)
	const diag1: number[] = [];
	for (let i = 0; i < boardSize; i++) {
		diag1.push(i * boardSize + i);
	}
	lines.push(diag1);

	// Diagonal (top-right -> bottom-left)
	const diag2: number[] = [];
	for (let i = 0; i < boardSize; i++) {
		diag2.push(i * boardSize + (boardSize - 1 - i));
	}
	lines.push(diag2);

	return lines;
};

/**
 * Based on the current board state and the available winning lines,
 * gets the game winner, if any.
 */
export const getWinner = (board: BoardState, winningLines: WinningLine[]): XorO | null => {
	for(const winningLine of winningLines) {
		const player = board[winningLine[0]];
		if(!player) continue;

		if(winningLine.every(
			(cellIndex) => board[cellIndex] === player
		)) {
			return player;
		}
	}

	return null;
}

/**
 * Whether or not every position on the board has been filled.
 */
export const isBoardFilled = (board: BoardState): boolean =>
	board.every((cell) => cell !== undefined);
