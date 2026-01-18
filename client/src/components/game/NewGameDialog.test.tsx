import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewGameDialog } from "./NewGameDialog";

describe("NewGameDialog", () => {
	it("calls onConfirm with selected settings", async () => {
		const user = userEvent.setup();
		const handleConfirm = jest.fn();
		render(
			<NewGameDialog
				onConfirm={handleConfirm}
				onCancel={jest.fn()}
				prevSettings={{ boardSize: 3, firstPlayer: "X" }}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "O", hidden: true }));
		await user.click(
			screen.getByRole("button", { name: "Start Game", hidden: true }),
		);

		expect(handleConfirm).toHaveBeenCalledWith({
			firstPlayer: "O",
			boardSize: 3,
		});
	});

	it("calls onCancel when cancelled", async () => {
		const user = userEvent.setup();
		const handleCancel = jest.fn();
		render(
			<NewGameDialog
				onConfirm={jest.fn()}
				onCancel={handleCancel}
				prevSettings={{ boardSize: 3, firstPlayer: "X" }}
			/>,
		);

		await user.click(
			screen.getByRole("button", { name: "Cancel", hidden: true }),
		);

		expect(handleCancel).toHaveBeenCalled();
	});

	it("initializes with previous settings", () => {
		render(
			<NewGameDialog
				onConfirm={jest.fn()}
				onCancel={jest.fn()}
				prevSettings={{ boardSize: 5, firstPlayer: "O" }}
			/>,
		);

		expect(
			screen.getByLabelText(/Board Size/, { selector: "input" }),
		).toHaveValue("5");
	});
});
