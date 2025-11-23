import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { UserInput } from "./UserInput";

describe.only("User Input", () => {
  it("renders successfully", () => {
    render(<UserInput isOpen={true} setBoardLength={jest.fn()} />);
    const userInputElement = screen.getByText(
      "Enter board size (the board length):",
    );
    expect(userInputElement).toBeVisible();
  });

  it("accepts numbers", async () => {
    const mockSetBoardLength = jest.fn();
    const user = userEvent.setup();
    render(<UserInput isOpen={true} setBoardLength={mockSetBoardLength} />);

    const input = screen.getByLabelText("Enter board size (the board length):");
    const startButton = screen.getByText("Start Game");

    await user.clear(input);
    await user.type(input, "5");
    await user.click(startButton);

    expect(mockSetBoardLength).toHaveBeenCalledWith(5);
  });

  it("does not accept numbers less than 3 ", async () => {
    const mockSetBoardLength = jest.fn();
    const user = userEvent.setup();
    render(<UserInput isOpen={true} setBoardLength={mockSetBoardLength} />);

    const input = screen.getByLabelText("Enter board size (the board length):");
    const startButton = screen.getByText("Start Game");

    await user.clear(input);
    await user.type(input, "2");
    await user.click(startButton);

    // expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(mockSetBoardLength).not.toHaveBeenCalled();
  });

  it("does not accept numbers greater than 15", async () => {
    const mockSetBoardLength = jest.fn();
    const user = userEvent.setup();
    render(<UserInput isOpen={true} setBoardLength={mockSetBoardLength} />);

    const input = screen.getByLabelText("Enter board size (the board length):");
    const startButton = screen.getByText("Start Game");

    // Test invalid input (greater than 15)
    await user.clear(input);
    await user.type(input, "16");
    await user.click(startButton);

    expect(mockSetBoardLength).not.toHaveBeenCalledWith(16);
  });
});
