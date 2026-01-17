import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board } from "./Board";
import type { BoardState } from "./types";

describe("Board", () => {
	const emptyBoard: BoardState = Array(9).fill(undefined);

	it("renders correct number of cells for 3x3 board", () => {
		render(<Board board={emptyBoard} />);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(9);
	});

	it("displays X and O in cells", () => {
		const board: BoardState = [
			"X",
			"O",
			undefined,
			undefined,
			"X",
			undefined,
			undefined,
			undefined,
			"O",
		];
		render(<Board board={board} />);

		const buttons = screen.getAllByRole("button");
		expect(buttons[0]).toHaveTextContent("X");
		expect(buttons[1]).toHaveTextContent("O");
		expect(buttons[2]).toHaveTextContent("");
		expect(buttons[4]).toHaveTextContent("X");
		expect(buttons[8]).toHaveTextContent("O");
	});

	it("calls onCellClick with correct index when cell is clicked", async () => {
		const user = userEvent.setup();
		const handleClick = jest.fn();
		render(<Board board={emptyBoard} onCellClick={handleClick} />);

		const buttons = screen.getAllByRole("button");
		await user.click(buttons[4]);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(4);
	});

	it("disables cells that already have a value", async () => {
		const board: BoardState = [
			"X",
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
		];
		render(<Board board={board} />);

		const buttons = screen.getAllByRole("button");
		expect(buttons[0]).toBeDisabled();
		expect(buttons[1]).not.toBeDisabled();
	});

	it("disables all cells when disabled prop is true", () => {
		render(<Board board={emptyBoard} disabled />);

		const buttons = screen.getAllByRole("button");
		for (const button of buttons) {
			expect(button).toBeDisabled();
		}
	});

	it("does not call onCellClick when clicking disabled cell", async () => {
		const user = userEvent.setup();
		const handleClick = jest.fn();
		const board: BoardState = [
			"X",
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
		];
		render(<Board board={board} onCellClick={handleClick} />);

		const buttons = screen.getAllByRole("button");
		await user.click(buttons[0]);

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("renders winning line SVG when winningLine is provided", () => {
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
		render(<Board board={board} winningLine={[0, 1, 2]} />);

		expect(screen.getByTitle("Winning line")).toBeInTheDocument();
	});

	it("does not render winning line SVG when winningLine is not provided", () => {
		render(<Board board={emptyBoard} />);

		expect(screen.queryByTitle("Winning line")).not.toBeInTheDocument();
	});
});
