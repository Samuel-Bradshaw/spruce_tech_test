import { act, renderHook } from "@testing-library/react";
import { type BoardState, DRAW } from "./types";
import {
	getNextPlayer,
	getNumTurns,
	getWinner,
	getWinningLines,
	isBoardFilled,
	useTicTacToe,
} from "./useTicTacToe";

describe("getNumTurns", () => {
	it("returns 0 for empty board", () => {
		const board: BoardState = [undefined, undefined, undefined, undefined];
		expect(getNumTurns(board)).toBe(0);
	});

	it("counts filled cells", () => {
		const board: BoardState = ["X", undefined, "O", undefined, "X", undefined];
		expect(getNumTurns(board)).toBe(3);
	});

	it("returns full count for filled board", () => {
		const board: BoardState = ["X", "O", "X", "O"];
		expect(getNumTurns(board)).toBe(4);
	});
});

describe("getNextPlayer", () => {
	it("returns first player on empty board", () => {
		const board: BoardState = [undefined, undefined, undefined, undefined];
		expect(getNextPlayer(board, "X")).toBe("X");
		expect(getNextPlayer(board, "O")).toBe("O");
	});

	it("alternates players based on turn count", () => {
		expect(getNextPlayer(["X", undefined, undefined, undefined], "X")).toBe(
			"O",
		);
		expect(getNextPlayer(["X", "O", undefined, undefined], "X")).toBe("X");
		expect(getNextPlayer(["X", "O", "X", undefined], "X")).toBe("O");
	});

	it("works when O goes first", () => {
		expect(getNextPlayer([undefined, undefined, undefined], "O")).toBe("O");
		expect(getNextPlayer(["O", undefined, undefined], "O")).toBe("X");
		expect(getNextPlayer(["O", "X", undefined], "O")).toBe("O");
	});
});

describe("getWinningLines", () => {
	it("generates correct lines for 3x3 board", () => {
		const lines = getWinningLines(3);

		// 3 rows + 3 columns + 2 diagonals = 8 lines
		expect(lines).toHaveLength(8);

		// Check rows
		expect(lines).toContainEqual([0, 1, 2]);
		expect(lines).toContainEqual([3, 4, 5]);
		expect(lines).toContainEqual([6, 7, 8]);

		// Check columns
		expect(lines).toContainEqual([0, 3, 6]);
		expect(lines).toContainEqual([1, 4, 7]);
		expect(lines).toContainEqual([2, 5, 8]);

		// Check diagonals
		expect(lines).toContainEqual([0, 4, 8]);
		expect(lines).toContainEqual([2, 4, 6]);
	});

	it("generates correct lines for 4x4 board", () => {
		const lines = getWinningLines(4);

		// 4 rows + 4 columns + 2 diagonals = 10 lines
		expect(lines).toHaveLength(10);

		// Check first row
		expect(lines).toContainEqual([0, 1, 2, 3]);
		// Check last row
		expect(lines).toContainEqual([12, 13, 14, 15]);
		// Check first column
		expect(lines).toContainEqual([0, 4, 8, 12]);
		// Check diagonals
		expect(lines).toContainEqual([0, 5, 10, 15]);
		expect(lines).toContainEqual([3, 6, 9, 12]);
	});

	it("generates correct lines for 5x5 board", () => {
		const lines = getWinningLines(5);

		// 5 rows + 5 columns + 2 diagonals = 12 lines
		expect(lines).toHaveLength(12);

		// Check diagonals
		expect(lines).toContainEqual([0, 6, 12, 18, 24]);
		expect(lines).toContainEqual([4, 8, 12, 16, 20]);
	});

	it("each line has correct length for various board sizes", () => {
		for (const size of [3, 4, 5, 10, 15]) {
			const lines = getWinningLines(size);
			for (const line of lines) {
				expect(line).toHaveLength(size);
			}
		}
	});

	it("generates correct number of lines for any board size", () => {
		for (const size of [3, 4, 5, 10, 15]) {
			const lines = getWinningLines(size);
			// rows + columns + 2 diagonals
			expect(lines).toHaveLength(size + size + 2);
		}
	});
});

describe("getWinner", () => {
	const winningLines = getWinningLines(3);

	it("returns null when no winner", () => {
		const board = [
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
		];
		expect(getWinner(board, winningLines)).toBeNull();
	});

	it("detects row win", () => {
		const board: BoardState = [
			"X",
			"X",
			"X",
			"O",
			"O",
			undefined,
			undefined,
			undefined,
			undefined,
		];
		const result = getWinner(board, winningLines);
		expect(result?.player).toBe("X");
		expect(result?.winningLine).toEqual([0, 1, 2]);
	});

	it("detects column win", () => {
		const board: BoardState = [
			"O",
			"X",
			"X",
			"O",
			"X",
			undefined,
			"O",
			undefined,
			undefined,
		];
		const result = getWinner(board, winningLines);
		expect(result?.player).toBe("O");
		expect(result?.winningLine).toEqual([0, 3, 6]);
	});

	it("detects TL-BR diagonal win", () => {
		const board: BoardState = [
			"X",
			"O",
			undefined,
			"O",
			"X",
			undefined,
			undefined,
			undefined,
			"X",
		];
		const result = getWinner(board, winningLines);
		expect(result?.player).toBe("X");
		expect(result?.winningLine).toEqual([0, 4, 8]);
	});

	it("detects TR-BR diagonal win", () => {
		const board: BoardState = [
			"X",
			"X",
			"O",
			undefined,
			"O",
			undefined,
			"O",
			undefined,
			"X",
		];
		const result = getWinner(board, winningLines);
		expect(result?.player).toBe("O");
		expect(result?.winningLine).toEqual([2, 4, 6]);
	});

	it("returns null for partial line", () => {
		const board: BoardState = [
			"X",
			"X",
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
		];
		expect(getWinner(board, winningLines)).toBeNull();
	});
});

describe("isBoardFilled", () => {
	it("returns false for empty board", () => {
		const board = [undefined, undefined, undefined, undefined];
		expect(isBoardFilled(board)).toBe(false);
	});

	it("returns false for partially filled board", () => {
		const board: BoardState = ["X", undefined, "O", undefined];
		expect(isBoardFilled(board)).toBe(false);
	});

	it("returns true for fully filled board", () => {
		const board: BoardState = ["X", "O", "X", "O"];
		expect(isBoardFilled(board)).toBe(true);
	});
});

describe("useTicTacToe", () => {
	it("initializes with empty board of correct size", () => {
		const { result } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "X" }),
		);

		expect(result.current.board).toHaveLength(9);
		expect(result.current.board.every((cell) => cell === undefined)).toBe(true);
	});

	it("initializes with correct first player", () => {
		const { result: resultX } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "X" }),
		);
		expect(resultX.current.nextPlayer).toBe("X");

		const { result: resultO } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "O" }),
		);
		expect(resultO.current.nextPlayer).toBe("O");
	});

	it("starts with no game result", () => {
		const { result } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "X" }),
		);
		expect(result.current.gameResult).toBeNull();
	});

	it("updates board when cell is set", () => {
		const { result } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "X" }),
		);

		act(() => {
			result.current.setCell(0, "X");
		});

		expect(result.current.board[0]).toBe("X");
	});

	it("alternates next player after each move", () => {
		const { result } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "X" }),
		);

		expect(result.current.nextPlayer).toBe("X");

		act(() => {
			result.current.setCell(0, "X");
		});
		expect(result.current.nextPlayer).toBe("O");

		act(() => {
			result.current.setCell(1, "O");
		});
		expect(result.current.nextPlayer).toBe("X");
	});

	it("detects winner and returns winning line", () => {
		const { result } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "X" }),
		);

		// X plays: 0, 1, 2 (top row)
		// O plays: 3, 4
		act(() => {
			result.current.setCell(0, "X");
		});
		act(() => {
			result.current.setCell(3, "O");
		});
		act(() => {
			result.current.setCell(1, "X");
		});
		act(() => {
			result.current.setCell(4, "O");
		});
		act(() => {
			result.current.setCell(2, "X");
		});

		expect(result.current.gameResult).toBe("X");
		expect(result.current.winningLine).toEqual([0, 1, 2]);
	});

	it("detects draw when board is filled with no winner", () => {
		const { result } = renderHook(() =>
			useTicTacToe({ boardSize: 3, firstPlayer: "X" }),
		);

		// Fill board with no winner:
		// X O X
		// X X O
		// O X O
		const moves = [
			{ index: 0, player: "X" },
			{ index: 1, player: "O" },
			{ index: 2, player: "X" },
			{ index: 4, player: "X" },
			{ index: 3, player: "X" },
			{ index: 5, player: "O" },
			{ index: 6, player: "O" },
			{ index: 8, player: "O" },
			{ index: 7, player: "X" },
		] as const;

		for (const move of moves) {
			act(() => {
				result.current.setCell(move.index, move.player);
			});
		}

		expect(result.current.gameResult).toBe(DRAW);
		expect(result.current.winningLine).toBeUndefined();
	});

	describe("with different board sizes", () => {
		it("initializes 4x4 board with 16 cells", () => {
			const { result } = renderHook(() =>
				useTicTacToe({ boardSize: 4, firstPlayer: "X" }),
			);

			expect(result.current.board).toHaveLength(16);
		});

		it("initializes 5x5 board with 25 cells", () => {
			const { result } = renderHook(() =>
				useTicTacToe({ boardSize: 5, firstPlayer: "X" }),
			);

			expect(result.current.board).toHaveLength(25);
		});

		it("detects winner on 4x4 board", () => {
			const { result } = renderHook(() =>
				useTicTacToe({ boardSize: 4, firstPlayer: "X" }),
			);

			// X plays top row: 0, 1, 2, 3
			// O plays second row: 4, 5, 6
			act(() => result.current.setCell(0, "X"));
			act(() => result.current.setCell(4, "O"));
			act(() => result.current.setCell(1, "X"));
			act(() => result.current.setCell(5, "O"));
			act(() => result.current.setCell(2, "X"));
			act(() => result.current.setCell(6, "O"));
			act(() => result.current.setCell(3, "X"));

			expect(result.current.gameResult).toBe("X");
			expect(result.current.winningLine).toEqual([0, 1, 2, 3]);
		});

		it("detects diagonal winner on 4x4 board", () => {
			const { result } = renderHook(() =>
				useTicTacToe({ boardSize: 4, firstPlayer: "X" }),
			);

			// X plays diagonal: 0, 5, 10, 15
			// O plays: 1, 2, 3
			act(() => result.current.setCell(0, "X"));
			act(() => result.current.setCell(1, "O"));
			act(() => result.current.setCell(5, "X"));
			act(() => result.current.setCell(2, "O"));
			act(() => result.current.setCell(10, "X"));
			act(() => result.current.setCell(3, "O"));
			act(() => result.current.setCell(15, "X"));

			expect(result.current.gameResult).toBe("X");
			expect(result.current.winningLine).toEqual([0, 5, 10, 15]);
		});

		it("detects column winner on 5x5 board", () => {
			const { result } = renderHook(() =>
				useTicTacToe({ boardSize: 5, firstPlayer: "X" }),
			);

			// X plays first column: 0, 5, 10, 15, 20
			// O plays second column: 1, 6, 11, 16
			act(() => result.current.setCell(0, "X"));
			act(() => result.current.setCell(1, "O"));
			act(() => result.current.setCell(5, "X"));
			act(() => result.current.setCell(6, "O"));
			act(() => result.current.setCell(10, "X"));
			act(() => result.current.setCell(11, "O"));
			act(() => result.current.setCell(15, "X"));
			act(() => result.current.setCell(16, "O"));
			act(() => result.current.setCell(20, "X"));

			expect(result.current.gameResult).toBe("X");
			expect(result.current.winningLine).toEqual([0, 5, 10, 15, 20]);
		});
	});
});
