import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Main } from "./main";

describe("Main Component", () => {
  describe("Initial Load", () => {
    it("renders the game title", () => {
      render(<Main />);

      const title = screen.getByText("Tic Tac Toe");
      expect(title).toBeInTheDocument();
    });

    it.skip("asks for user input when the board length has not been set", () => {
      render(<Main />);

      const userInputElement = screen.getByText("User Input Component");
      expect(userInputElement).toBeVisible();
    });

    it.skip("does not ask for user input when the board length has been set", () => {
      render(<Main />);

      expect(screen.queryByText("User Input Component")).toBeNull();
    });

    it("renders all 9 game board cells successfully", () => {
      render(<Main />);

      const cells = screen.getAllByTestId(/^cell-/);
      expect(cells).toHaveLength(9);
    });

    it("renders all cells as empty initially", () => {
      render(<Main />);

      const cells = screen.getAllByTestId(/^cell-/);

      cells.forEach((cell) => {
        expect(cell.textContent).toBe("");
      });
    });
  });

  describe("Basic Functionality", () => {
    it("renders an X when cell is clicked on", async () => {
      const user = userEvent.setup();
      render(<Main />);

      const cell = screen.getByTestId("cell-0");
      await user.click(cell);

      expect(cell.textContent).toBe("X");
    });

    it("toggles active player after clicking a cell", async () => {
      const user = userEvent.setup();
      render(<Main />);

      const firstCell = screen.getByTestId("cell-0");
      const secondCell = screen.getByTestId("cell-1");
      const thirdCell = screen.getByTestId("cell-2");

      await user.click(firstCell);
      await user.click(secondCell);
      await user.click(thirdCell);

      expect(secondCell.textContent).toBe("O");
      expect(thirdCell.textContent).toBe("X");
    });

    it("blocks a cell after it has been played on", async () => {
      const user = userEvent.setup();
      render(<Main />);
      const cell = screen.getByTestId("cell-0");

      await user.click(cell);
      await user.click(cell);

      expect(cell.textContent).toBe("X");
    });

    it("does not toggle the player if clicking on a blocked cell", async () => {
      const user = userEvent.setup();
      render(<Main />);

      const firstCell = screen.getByTestId("cell-0");
      const secondCell = screen.getByTestId("cell-1"); //

      await user.click(firstCell);
      await user.click(firstCell); // Same cell click
      await user.click(secondCell);

      expect(secondCell.textContent).toBe("O");
    });
  });

  describe("Winning Conditions", () => {
    it("should not declare a winner at match start", async () => {
      render(<Main />);

      expect(screen.queryByText(/Player [XO] wins!/)).not.toBeInTheDocument();
    });

    it("displays a draw modal when the board is full without a winner", async () => {
      const user = userEvent.setup();
      render(<Main />);

      const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]; // XOXOOXXOX

      for (const move of moves) {
        const cell = screen.getByTestId(`cell-${move}`);
        await user.click(cell);
      }

      const drawText = await screen.findByText("It's a draw!");
      expect(drawText).toBeVisible();
    });

    it("displays winner modal when a player wins", async () => {
      const user = userEvent.setup();
      render(<Main />);

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

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
      const user = userEvent.setup();
      render(<Main />);

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

      await user.click(upperLeftCell);
      await user.click(screen.getByTestId("cell-2"));
      await user.click(middleLeftCell);
      await user.click(screen.getByTestId("cell-4"));
      await user.click(lowerLeftCell);

      const playAgainButton = await screen.findByText("Play Again");
      await user.click(playAgainButton);

      const cells = screen.getAllByTestId(/^cell-/);
      cells.forEach((cell) => {
        expect(cell.textContent).toBe("");
      });
    });

    it("always resets to the active player being X", async () => {
      const user = userEvent.setup();
      render(<Main />);

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

      await user.click(upperLeftCell);
      await user.click(screen.getByTestId("cell-2"));
      await user.click(middleLeftCell);
      await user.click(screen.getByTestId("cell-4"));
      await user.click(lowerLeftCell);

      const playAgainButton = screen.getByText("Play Again");
      await user.click(playAgainButton);

      const firstCell = screen.getByTestId("cell-0");
      await user.click(firstCell);
      expect(firstCell.textContent).toBe("X");
    });
  });
});
