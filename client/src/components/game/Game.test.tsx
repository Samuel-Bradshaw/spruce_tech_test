import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Game } from "./Game";
import { DRAW, type GameSettings } from "./types";

const getCell = (index: number) => screen.getByTestId(`cell-${index}`);
const getStatus = () => screen.getByTestId("game-status");

const playMoves = async (
	user: ReturnType<typeof userEvent.setup>,
	moves: number[],
) => {
	for (const move of moves) {
		await user.click(getCell(move));
	}
};

// Common move sequences
const WIN_SEQUENCE = [0, 3, 1, 4, 2]; // X wins top row
const DRAW_SEQUENCE = [0, 1, 2, 5, 3, 6, 4, 8, 7]; // XOX/XXO/OXO

const testPlayerX = { id: "test-x", name: "Player X" };
const testPlayerO = { id: "test-o", name: "Player O" };
const defaultSettings: GameSettings = {
	id: "test-game-id",
	boardSize: 3,
	firstPlayer: "X",
	xPlayer: testPlayerX,
	oPlayer: testPlayerO,
};

describe("Game component integration test", () => {
	it("displays and alternates next player", async () => {
		const user = userEvent.setup();
		render(<Game gameSettings={defaultSettings} />);

		expect(getStatus()).toHaveTextContent("Next player:");
		await user.click(getCell(0));
		expect(getStatus()).toHaveTextContent("Next player:");
	});

	it("uses specified first player", () => {
		render(<Game gameSettings={{ ...defaultSettings, firstPlayer: "O" }} />);
		expect(getStatus()).toHaveTextContent("Next player:");
	});

	it("displays winner and disables cells when game is won", async () => {
		const user = userEvent.setup();
		const handleGameOver = jest.fn();
		render(<Game gameSettings={defaultSettings} onGameOver={handleGameOver} />);

		await playMoves(user, WIN_SEQUENCE);

		expect(getStatus()).toHaveTextContent("Winner:");
		expect(handleGameOver).toHaveBeenCalledWith("X");
		for (let i = 0; i < 9; i++) {
			expect(getCell(i)).toBeDisabled();
		}
	});

	it("displays draw and calls onGameOver with DRAW", async () => {
		const user = userEvent.setup();
		const handleGameOver = jest.fn();
		render(<Game gameSettings={defaultSettings} onGameOver={handleGameOver} />);

		await playMoves(user, DRAW_SEQUENCE);

		expect(getStatus()).toHaveTextContent("Draw!");
		expect(handleGameOver).toHaveBeenCalledWith(DRAW);
	});

	it("renders correct board size", () => {
		const { unmount } = render(
			<Game gameSettings={{ ...defaultSettings, boardSize: 4 }} />,
		);
		expect(screen.getAllByRole("button")).toHaveLength(16);
		unmount();

		render(<Game gameSettings={{ ...defaultSettings, boardSize: 5 }} />);
		expect(screen.getAllByRole("button")).toHaveLength(25);
	});

	it("detects winner on 4x4 board", async () => {
		const user = userEvent.setup();
		const handleGameOver = jest.fn();
		render(
			<Game
				gameSettings={{ ...defaultSettings, boardSize: 4 }}
				onGameOver={handleGameOver}
			/>,
		);

		await playMoves(user, [0, 4, 1, 5, 2, 6, 3]); // X wins top row on 4x4

		expect(handleGameOver).toHaveBeenCalledWith("X");
		expect(getStatus()).toHaveTextContent("Winner:");
	});
});
