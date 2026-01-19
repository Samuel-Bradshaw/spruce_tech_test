import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { GameSettings } from "../types";
import { NewGameDialog } from "./NewGameDialog";

const testPlayerX = { id: "test-x", name: "Player X" };
const testPlayerO = { id: "test-o", name: "Player O" };
const defaultSettings: GameSettings = {
	boardSize: 3,
	firstPlayer: "X",
	xPlayer: testPlayerX,
	oPlayer: testPlayerO,
};
const testPlayers = [testPlayerX, testPlayerO];

describe("NewGameDialog", () => {
	it("calls onConfirm with selected settings", async () => {
		const user = userEvent.setup();
		const handleConfirm = jest.fn();
		render(
			<NewGameDialog
				onConfirm={handleConfirm}
				onCancel={jest.fn()}
				prevSettings={defaultSettings}
				players={testPlayers}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "O", hidden: true }));
		await user.click(
			screen.getByRole("button", { name: "Start Game", hidden: true }),
		);

		expect(handleConfirm).toHaveBeenCalledWith({
			firstPlayer: "O",
			boardSize: 3,
			xPlayer: testPlayerX,
			oPlayer: testPlayerO,
		});
	});

	it("calls onCancel when cancelled", async () => {
		const user = userEvent.setup();
		const handleCancel = jest.fn();
		render(
			<NewGameDialog
				onConfirm={jest.fn()}
				onCancel={handleCancel}
				prevSettings={defaultSettings}
				players={testPlayers}
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
				prevSettings={{ ...defaultSettings, boardSize: 5, firstPlayer: "O" }}
				players={testPlayers}
			/>,
		);

		expect(
			screen.getByLabelText(/Board Size/, { selector: "input" }),
		).toHaveValue("5");
	});
});
