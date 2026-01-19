import { act, renderHook } from "@testing-library/react";
import { DRAW } from "./types";
import {
	DRAW_BOARD,
	EMPTY_BOARD,
	X_WINS_DIAGONAL,
	X_WINS_TOP_ROW,
	O_WINS_LEFT_COL,
	board,
} from "./testUtils";
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
		expect(getNumTurns(EMPTY_BOARD)).toBe(0);
	});

	it("counts filled cells", () => {
		expect(getNumTurns(X_WINS_TOP_ROW)).toBe(5);
	});

	it("returns full count for filled board", () => {
		expect(getNumTurns(DRAW_BOARD)).toBe(9);
	});
});

describe("getNextPlayer", () => {
	it("returns first player on empty board", () => {
		expect(getNextPlayer(EMPTY_BOARD, "X")).toBe("X");
		expect(getNextPlayer(EMPTY_BOARD, "O")).toBe("O");
	});

	it("alternates players based on turn count", () => {
		expect(
			getNextPlayer(
				board([
					["X", null, null],
					[null, null, null],
					[null, null, null],
				]),
				"X",
			),
		).toBe("O");
		expect(
			getNextPlayer(
				board([
					["X", "O", null],
					[null, null, null],
					[null, null, null],
				]),
				"X",
			),
		).toBe("X");
		expect(
			getNextPlayer(
				board([
					["X", "O", "X"],
					[null, null, null],
					[null, null, null],
				]),
				"X",
			),
		).toBe("O");
	});

	it("works when O goes first", () => {
		expect(
			getNextPlayer(
				board([
					[null, null, null],
					[null, null, null],
					[null, null, null],
				]),
				"O",
			),
		).toBe("O");
		expect(
			getNextPlayer(
				board([
					["O", null, null],
					[null, null, null],
					[null, null, null],
				]),
				"O",
			),
		).toBe("X");
		expect(
			getNextPlayer(
				board([
					["O", "X", null],
					[null, null, null],
					[null, null, null],
				]),
				"O",
			),
		).toBe("O");
	});
});

describe("getWinningLines", () => {
	it("generates correct lines for 3x3 board", () => {
		const lines = getWinningLines(3);
		expect(lines).toHaveLength(8);
		expect(lines).toContainEqual([0, 1, 2]); // top row
		expect(lines).toContainEqual([0, 3, 6]); // left column
		expect(lines).toContainEqual([0, 4, 8]); // diagonal
		expect(lines).toContainEqual([2, 4, 6]); // anti-diagonal
	});

	it("generates correct lines for larger boards", () => {
		expect(getWinningLines(4)).toHaveLength(10);
		expect(getWinningLines(5)).toHaveLength(12);
	});

	it("each line has correct length matching board size", () => {
		for (const size of [3, 4, 5, 10, 15]) {
			const lines = getWinningLines(size);
			expect(lines).toHaveLength(size * 2 + 2);
			for (const line of lines) {
				expect(line).toHaveLength(size);
			}
		}
	});
});

describe("getWinner", () => {
	const lines = getWinningLines(3);

	it("returns null when no winner", () => {
		expect(getWinner(EMPTY_BOARD, lines)).toBeNull();
		expect(
			getWinner(
				board([
					["X", "X", null],
					[null, null, null],
					[null, null, null],
				]),
				lines,
			),
		).toBeNull();
	});

	it("detects row win", () => {
		const result = getWinner(X_WINS_TOP_ROW, lines);
		expect(result?.player).toBe("X");
		expect(result?.winningLine).toEqual([0, 1, 2]);
	});

	it("detects column win", () => {
		const result = getWinner(O_WINS_LEFT_COL, lines);
		expect(result?.player).toBe("O");
		expect(result?.winningLine).toEqual([0, 3, 6]);
	});

	it("detects diagonal wins", () => {
		expect(getWinner(X_WINS_DIAGONAL, lines)?.winningLine).toEqual([0, 4, 8]);
	});
});

describe("isBoardFilled", () => {
	it("returns false for empty or partial boards", () => {
		expect(isBoardFilled(EMPTY_BOARD)).toBe(false);
		expect(isBoardFilled(X_WINS_TOP_ROW)).toBe(false);
	});

	it("returns true for fully filled board", () => {
		expect(isBoardFilled(DRAW_BOARD)).toBe(true);
	});
});

describe("useTicTacToe", () => {
	const testPlayerX = { id: "test-x", name: "Player X" };
	const testPlayerO = { id: "test-o", name: "Player O" };
	const defaultSettings = {
		boardSize: 3,
		firstPlayer: "X" as const,
		xPlayer: testPlayerX,
		oPlayer: testPlayerO,
	};

	const renderGame = (settings = defaultSettings) =>
		renderHook(() => useTicTacToe(settings));

	const playMoves = (
		result: ReturnType<typeof renderGame>["result"],
		moves: number[],
	) => {
		const players = ["X", "O"] as const;
		moves.forEach((index, i) => {
			act(() => result.current.setCell(index, players[i % 2]));
		});
	};

	it("initializes correctly", () => {
		const { result } = renderGame();
		expect(result.current.board).toHaveLength(9);
		expect(result.current.board.every((c) => c === undefined)).toBe(true);
		expect(result.current.nextPlayer).toBe("X");
		expect(result.current.gameResult).toBeNull();
	});

	it("updates board and alternates players", () => {
		const { result } = renderGame();
		playMoves(result, [0, 1]);
		expect(result.current.board[0]).toBe("X");
		expect(result.current.board[1]).toBe("O");
		expect(result.current.nextPlayer).toBe("X");
	});

	it("detects winner", () => {
		const { result } = renderGame();
		playMoves(result, [0, 3, 1, 4, 2]); // X wins top row
		expect(result.current.gameResult).toBe("X");
		expect(result.current.winningLine).toEqual([0, 1, 2]);
	});

	it("detects draw", () => {
		const { result } = renderGame();
		playMoves(result, [0, 1, 2, 4, 3, 5, 7, 6, 8]); // fill board, no winner
		expect(result.current.gameResult).toBe(DRAW);
		expect(result.current.winningLine).toBeUndefined();
	});

	it("works with different board sizes", () => {
		const { result: r4 } = renderGame({ ...defaultSettings, boardSize: 4 });
		expect(r4.current.board).toHaveLength(16);
		playMoves(r4, [0, 4, 1, 5, 2, 6, 3]); // X wins top row
		expect(r4.current.gameResult).toBe("X");

		const { result: r5 } = renderGame({ ...defaultSettings, boardSize: 5 });
		expect(r5.current.board).toHaveLength(25);
	});
});
