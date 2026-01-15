import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { UserInput } from "./UserInput";
import { GameSessionProvider } from "../providers/game-session";

describe("User Input", () => {
  it("renders successfully", () => {
    render(<UserInput />, {
      wrapper: GameSessionProvider,
    });

    const userInputElement = screen.getByText(
      "Enter board size (the board length):",
    );
    expect(userInputElement).toBeVisible();
  });

  it("accepts numbers", async () => {
    const user = userEvent.setup();

    const mockStartNewGame = jest.fn();
    jest
      .spyOn(require("../hooks/useGameSession"), "useGameSession")
      .mockReturnValue({
        board: undefined,
        boardLength: undefined,
        activePlayer: "X",
        isLoading: false,
        startNewGame: mockStartNewGame,
        makeGameMove: jest.fn(),
      });

    render(<UserInput />);

    const input = screen.getByLabelText("Enter board size (the board length):");
    const startButton = screen.getByText("Start Game");

    await user.clear(input);
    await user.type(input, "5");
    await user.click(startButton);

    expect(mockStartNewGame).toHaveBeenCalledWith(5);
  });

  it("does not accept numbers less than 3 ", async () => {
    const mockSetBoardLength = jest.fn();
    const user = userEvent.setup();

    render(<UserInput />, {
      wrapper: GameSessionProvider,
    });

    const input = screen.getByLabelText("Enter board size (the board length):");
    const startButton = screen.getByText("Start Game");

    await user.clear(input);
    await user.type(input, "2");
    await user.click(startButton);

    expect(mockSetBoardLength).not.toHaveBeenCalled();
  });

  it("does not accept numbers greater than 15", async () => {
    const mockSetBoardLength = jest.fn();
    const user = userEvent.setup();

    render(<UserInput />, {
      wrapper: GameSessionProvider,
    });

    const input = screen.getByLabelText("Enter board size (the board length):");
    const startButton = screen.getByText("Start Game");

    await user.clear(input);
    await user.type(input, "16");
    await user.click(startButton);

    expect(mockSetBoardLength).not.toHaveBeenCalledWith(16);
  });

  describe("Warning Display", () => {
    it("displays warning when input is not a valid number", async () => {
      const mockSetBoardLength = jest.fn();
      const user = userEvent.setup();

      render(<UserInput />, {
        wrapper: GameSessionProvider,
      });

      const input = screen.getByLabelText(
        "Enter board size (the board length):",
      );
      const startButton = screen.getByText("Start Game");

      await user.clear(input);
      await user.type(input, "16");
      await user.click(startButton);

      const warningMessage = await screen.findByText(
        /Invalid Input. Only valid numbers between 3 and 15 are allowed./i,
      );
      expect(warningMessage).toBeVisible();
      expect(mockSetBoardLength).not.toHaveBeenCalled();
    });

    it("clears warning when valid input is entered after error", async () => {
      const mockStartNewGame = jest.fn();
      const user = userEvent.setup();

      jest
        .spyOn(require("../hooks/useGameSession"), "useGameSession")
        .mockReturnValue({
          board: undefined,
          boardLength: undefined,
          activePlayer: "X",
          isLoading: false,
          startNewGame: mockStartNewGame,
          makeGameMove: jest.fn(),
        });

      render(<UserInput />, { wrapper: GameSessionProvider });

      const input = screen.getByLabelText(
        "Enter board size (the board length):",
      );
      const startButton = screen.getByText("Start Game");

      // First invalid input
      await user.clear(input);
      await user.type(input, "1");
      await user.click(startButton);

      const warningMessage = await screen.findByText(
        /Invalid Input. Only valid numbers between 3 and 15 are allowed./i,
      );
      expect(warningMessage).toBeVisible();

      // Then valid input
      await user.clear(input);
      await user.type(input, "5");
      await user.click(startButton);

      expect(
        screen.queryByText(
          /Invalid Input. Only numbers between 3 and 15 are allowed./i,
        ),
      ).not.toBeInTheDocument();
      expect(mockStartNewGame).toHaveBeenCalledWith(5);
    });
  });
});
