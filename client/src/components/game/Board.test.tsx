import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board } from "./Board";
import { board, EMPTY_BOARD, X_WINS_TOP_ROW } from "./testUtils";

describe("Board", () => {
	it("renders correct number of cells", () => {
		render(<Board board={EMPTY_BOARD} />);
		expect(screen.getAllByRole("button")).toHaveLength(9);
	});

	it("displays X and O in cells", () => {
		render(
			<Board
				board={board([
					["X", "O", null],
					[null, "X", null],
					[null, null, "O"],
				])}
			/>,
		);

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
		render(<Board board={EMPTY_BOARD} onCellClick={handleClick} />);

		await user.click(screen.getAllByRole("button")[4]);

		expect(handleClick).toHaveBeenCalledWith(4);
	});

	it("disables filled cells and respects disabled prop", async () => {
		const user = userEvent.setup();
		const handleClick = jest.fn();
		const { rerender } = render(
			<Board
				board={board([
					["X", null, null],
					[null, null, null],
					[null, null, null],
				])}
				onCellClick={handleClick}
			/>,
		);

		const buttons = screen.getAllByRole("button");
		expect(buttons[0]).toBeDisabled();
		expect(buttons[1]).not.toBeDisabled();

		await user.click(buttons[0]);
		expect(handleClick).not.toHaveBeenCalled();

		rerender(<Board board={EMPTY_BOARD} disabled />);
		for (const button of screen.getAllByRole("button")) {
			expect(button).toBeDisabled();
		}
	});

	it("renders winning line SVG when provided", () => {
		render(<Board board={X_WINS_TOP_ROW} winningLine={[0, 1, 2]} />);
		expect(screen.getByTitle("Winning line")).toBeInTheDocument();
	});

	it("does not render winning line when not provided", () => {
		render(<Board board={EMPTY_BOARD} />);
		expect(screen.queryByTitle("Winning line")).not.toBeInTheDocument();
	});
});
