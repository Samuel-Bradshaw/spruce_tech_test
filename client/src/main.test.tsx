import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Main } from "./main";

describe("Main Component", () => {
  it("renders the game title", () => {
    render(<Main />);

    const title = screen.getByText("Tic Tac Toe");
    expect(title).toBeInTheDocument();
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

  it("renders an X when cell is clicked on", async () => {
    render(<Main />);

    const cell = screen.getByTestId("cell-0");
    await cell.click();

    expect(cell.textContent).toBe("X");
  });

  it("toggles active player after clicking a cell", async () => {
    render(<Main />);

    const firstCell = screen.getByTestId("cell-0");
    const secondCell = screen.getByTestId("cell-1");
    const thirdCell = screen.getByTestId("cell-2");

    await firstCell.click();
    await secondCell.click();
    await thirdCell.click();

    expect(secondCell.textContent).toBe("O");
    expect(thirdCell.textContent).toBe("X");
  });

  it("blocks a cell after it has been played on", async () => {
    render(<Main />);
    const cell = screen.getByTestId("cell-0");

    await cell.click();
    await cell.click();

    expect(cell.textContent).toBe("X");
  });

  it("does not toggle the player if clicking on a blocked cell", async () => {
    render(<Main />);

    const firstCell = screen.getByTestId("cell-0");
    const secondCell = screen.getByTestId("cell-1"); //

    await firstCell.click();
    await firstCell.click(); // Same cell click
    await secondCell.click();

    expect(secondCell.textContent).toBe("O");
  });

  describe("Winning Conditions", () => {
    it("should not declare an undefined winner", async () => {
      render(<Main />);

      expect(screen.queryByText(/Player [XO] wins!/)).not.toBeInTheDocument();
    });

    it("displays winner modal when a player wins", async () => {
      render(<Main />);

      const upperLeftCell = screen.getByTestId("cell-0");
      const middleLeftCell = screen.getByTestId("cell-3");
      const lowerLeftCell = screen.getByTestId("cell-6");

      await upperLeftCell.click();
      await screen.getByTestId("cell-2").click();
      await middleLeftCell.click();
      await screen.getByTestId("cell-4").click();
      await lowerLeftCell.click();

      const winnerText = await screen.findByText("Player X wins!");
      expect(winnerText).toBeVisible();
    });
  });
});
