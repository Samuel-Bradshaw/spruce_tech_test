import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { UserInput } from "./UserInput";

describe.only("User Input", () => {
  it("renders successfully", () => {
    render(<UserInput setBoardLength={jest.fn()} />);
    const userInputElement = screen.getByText(
      "Enter board size (the board length):",
    );
    expect(userInputElement).toBeVisible();
  });

  it.skip("should return desired board length", async () => {
    const user = userEvent.setup();
    const mockSetBoardLength = jest.fn();
    render(<UserInput setBoardLength={mockSetBoardLength} />);
    const input = screen.getByLabelText("Enter board size (the board length):");

    await user.clear(input);
    await user.type(input, "4");

    const button = screen.getByText("Start Game");
    await user.click(button);

    expect(input).toHaveValue(4);
  });
});
