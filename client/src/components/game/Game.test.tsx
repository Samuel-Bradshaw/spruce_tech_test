import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Game } from "./Game";
import { DRAW } from "./types";

const getCell = (index: number) => screen.getByTestId(`cell-${index}`);

describe("Game component integration test", () => {
	it("displays next player indicator", () => {
		render(<Game />);
		expect(screen.getByTestId("game-status")).toHaveTextContent(
			"Next player: X",
		);
	});

	it("uses specified first player", () => {
		render(<Game gameSettings={{ boardSize: 3, firstPlayer: "O" }} />);
		expect(screen.getByTestId("game-status")).toHaveTextContent(
			"Next player: O",
		);
	});

	it("alternates players after each move", async () => {
		const user = userEvent.setup();
		render(<Game />);

		expect(screen.getByTestId("game-status")).toHaveTextContent(
			"Next player: X",
		);

		await user.click(getCell(0));

		expect(screen.getByTestId("game-status")).toHaveTextContent(
			"Next player: O",
		);
	});

	it("displays winner when game is won", async () => {
		const user = userEvent.setup();
		render(<Game />);

		await user.click(getCell(0));
		await user.click(getCell(3));
		await user.click(getCell(1));
		await user.click(getCell(4));
		await user.click(getCell(2));

		expect(screen.getByTestId("game-status")).toHaveTextContent("Winner:");
	});

	it("displays draw message when game ends in draw", async () => {
		const user = userEvent.setup();
		render(<Game />);

		// X O X
		// X X O
		// O X O
		await user.click(getCell(0));
		await user.click(getCell(1));
		await user.click(getCell(2));
		await user.click(getCell(5));
		await user.click(getCell(3));
		await user.click(getCell(6));
		await user.click(getCell(4));
		await user.click(getCell(8));
		await user.click(getCell(7));

		expect(screen.getByTestId("game-status")).toHaveTextContent("Draw!");
	});

	it("calls onGameOver when game is won", async () => {
		const user = userEvent.setup();
		const handleGameOver = jest.fn();
		render(<Game onGameOver={handleGameOver} />);

		// X wins with top row
		await user.click(getCell(0));
		await user.click(getCell(3));
		await user.click(getCell(1));
		await user.click(getCell(4));
		await user.click(getCell(2));

		expect(handleGameOver).toHaveBeenCalledTimes(1);
		expect(handleGameOver).toHaveBeenCalledWith("X");
	});

	it("calls onGameOver with DRAW when game ends in draw", async () => {
		const user = userEvent.setup();
		const handleGameOver = jest.fn();
		render(<Game onGameOver={handleGameOver} />);

		await user.click(getCell(0));
		await user.click(getCell(1));
		await user.click(getCell(2));
		await user.click(getCell(5));
		await user.click(getCell(3));
		await user.click(getCell(6));
		await user.click(getCell(4));
		await user.click(getCell(8));
		await user.click(getCell(7));

		expect(handleGameOver).toHaveBeenCalledTimes(1);
		expect(handleGameOver).toHaveBeenCalledWith(DRAW);
	});

	it("disables all cells after game ends", async () => {
		const user = userEvent.setup();
		render(<Game />);

		// X wins with top row
		await user.click(getCell(0)); // X
		await user.click(getCell(3)); // O
		await user.click(getCell(1)); // X
		await user.click(getCell(4)); // O
		await user.click(getCell(2)); // X wins

		// All cells should be disabled
		for (let i = 0; i < 9; i++) {
			expect(getCell(i)).toBeDisabled();
		}
	});

	it("renders correct board size", () => {
		render(<Game gameSettings={{ boardSize: 4, firstPlayer: "X" }} />);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(16);
	});
});
