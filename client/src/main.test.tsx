import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Main } from "./main";
import * as honoClient from "./services/hono-client";
import {
  mockCompletedGame,
  mockGameMove,
  mockNewGame,
} from "./utils/test-mocks";

jest.mock("./services/hono-client", () => ({
  __esModule: true,
  default: {},
  startGame: jest.fn(),
  makeMove: jest.fn(),
  declareWinner: jest.fn(),
  fetchGameStats: jest.fn(),
}));

describe("Main Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (honoClient.startGame as jest.Mock).mockImplementation(mockNewGame);
    (honoClient.makeMove as jest.Mock).mockImplementation(mockGameMove());
    (honoClient.declareWinner as jest.Mock).mockResolvedValue(
      mockCompletedGame(),
    );
  });

  describe("Initial Load", () => {
    it("renders the game title", () => {
      render(<Main />);

      const title = screen.getByText("Tic Tac Toe");
      expect(title).toBeInTheDocument();
    });

    it("asks for user input when the board length has not been set", () => {
      render(<Main />);

      const userInputElement = screen.getByText("Let's play a new game");
      expect(userInputElement).toBeVisible();
    });

    it("does not ask for user input when the board length has been set", async () => {
      render(<Main />);
      await startGame();

      expect(screen.queryByText("Let's play a new game")).toBeNull();
    });

    it("renders all cells as empty initially", async () => {
      render(<Main />);
      await startGame();

      const cells = screen.getAllByTestId(/^cell-/);

      cells.forEach((cell) => {
        expect(cell.textContent).toBe("");
      });
    });

    it("renders correct number of cells for 5x5 board", async () => {
      render(<Main />);
      await startGame("5");

      const cells = screen.getAllByTestId(/^cell-/);
      expect(cells).toHaveLength(25);
    });
  });

  describe("Basic Functionality", () => {
    it("renders an X when cell is clicked on", async () => {
      render(<Main />);
      await startGame();

      const cell = screen.getByTestId("cell-0");
      const user = userEvent.setup();
      await user.click(cell);

      expect(cell.textContent).toBe("X");
    });

    it("toggles active player after clicking a cell", async () => {
      render(<Main />);
      await startGame();

      const firstCell = screen.getByTestId("cell-0");
      const secondCell = screen.getByTestId("cell-1");
      const thirdCell = screen.getByTestId("cell-2");

      const user = userEvent.setup();
      await user.click(firstCell);
      await user.click(secondCell);
      await user.click(thirdCell);

      expect(secondCell.textContent).toBe("O");
      expect(thirdCell.textContent).toBe("X");
    });

    it("blocks a cell after it has been played on", async () => {
      render(<Main />);
      await startGame();

      const cell = screen.getByTestId("cell-0");

      const user = userEvent.setup();
      await user.click(cell);
      await user.click(cell);

      expect(cell.textContent).toBe("X");
    });

    it("does not toggle the player if clicking on a blocked cell", async () => {
      render(<Main />);
      await startGame();

      const firstCell = screen.getByTestId("cell-0");
      const secondCell = screen.getByTestId("cell-1"); //

      const user = userEvent.setup();
      await user.click(firstCell);
      await user.click(firstCell); // Same cell click
      await user.click(secondCell);

      expect(secondCell.textContent).toBe("O");
    });
  });

  describe("Winning Conditions", () => {
    it("should not declare a winner at match start", async () => {
      render(<Main />);
      await startGame();

      expect(screen.queryByText(/Player [XO] wins!/)).not.toBeInTheDocument();
    });

    it("displays a draw modal when the board is full without a winner", async () => {
      render(<Main />);
      await startGame();

      const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]; // XOXOOXXOX

      const user = userEvent.setup();
      for (const move of moves) {
        const cell = screen.getByTestId(`cell-${move}`);
        await user.click(cell);
      }

      const drawText = await screen.findByText("It's a draw!");
      expect(drawText).toBeVisible();
    });

    it("displays winner modal when a player wins", async () => {
      render(<Main />);
      await startGame();

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

      const user = userEvent.setup();
      await user.click(upperLeftCell);
      await user.click(screen.getByTestId("cell-2"));
      await user.click(middleLeftCell);
      await user.click(screen.getByTestId("cell-4"));
      await user.click(lowerLeftCell);

      const winnerText = await screen.findByText('Player "X" wins!');
      expect(winnerText).toBeVisible();
    });
  });

  describe("Reset Functionality", () => {
    it("resets the board when 'Play Again' is clicked", async () => {
      render(<Main />);
      await startGame();

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

      const user = userEvent.setup();
      await user.click(upperLeftCell);
      await user.click(screen.getByTestId("cell-2"));
      await user.click(middleLeftCell);
      await user.click(screen.getByTestId("cell-4"));
      await user.click(lowerLeftCell);

      const playAgainButton = await screen.findByText("Play Again");
      await user.click(playAgainButton);

      expect(screen.queryAllByTestId(/^cell-/)?.length).toEqual(0);
    });

    it("resets to the active player being X", async () => {
      render(<Main />);
      await startGame();

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

      const user = userEvent.setup();
      await user.click(upperLeftCell);
      await user.click(screen.getByTestId("cell-2"));
      await user.click(middleLeftCell);
      await user.click(screen.getByTestId("cell-4"));
      await user.click(lowerLeftCell);

      const playAgainButton = screen.getByText("Play Again");
      await user.click(playAgainButton);

      await startGame();

      const firstCell = screen.getByTestId("cell-0");
      await user.click(firstCell);
      expect(firstCell.textContent).toBe("X");
    });

    it("resets the board length and game outcome", async () => {
      render(<Main />);
      await startGame();

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

      const user = userEvent.setup();
      await user.click(upperLeftCell);
      await user.click(screen.getByTestId("cell-2"));
      await user.click(middleLeftCell);
      await user.click(screen.getByTestId("cell-4"));
      await user.click(lowerLeftCell);

      const playAgainButton = screen.getByText("Play Again");
      await user.click(playAgainButton);

      expect(screen.getByText("Let's play a new game")).toBeVisible();
    });
  });

  async function startGame(boardLength = "3") {
    const input = screen.getByLabelText("Enter board size (the board length):");

    const user = userEvent.setup();
    await user.clear(input);
    await user.type(input, boardLength);

    const startButton = screen.getByText("Start Game");
    await user.click(startButton);
  }
});
