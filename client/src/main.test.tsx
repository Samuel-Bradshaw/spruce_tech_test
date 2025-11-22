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
    it("handles vertical winning conditions", async () => {
      render(<Main />);

      const upperLeftCell = screen.getByTestId("cell-0-0");
      const middleLeftCell = screen.getByTestId("cell-1-0");
      const lowerLeftCell = screen.getByTestId("cell-2-0");

      await upperLeftCell.click();
      await screen.getByTestId("cell-0-1").click();
      await middleLeftCell.click();
      await screen.getByTestId("cell-0-2").click();
      await lowerLeftCell.click();

      expect(upperLeftCell.textContent).toBe("X");
      expect(middleLeftCell.textContent).toBe("X");
      expect(lowerLeftCell.textContent).toBe("X");
    });

    it("handles horizontal winning conditions", async () => {
      render(<Main />);
      const topLeft = screen.getByTestId("cell-0-0");
      const topMiddle = screen.getByTestId("cell-0-1");
      const topRight = screen.getByTestId("cell-0-2");

      await topLeft.click();
      await screen.getByTestId("cell-1-0").click();
      await topMiddle.click();
      await screen.getByTestId("cell-1-1").click();
      await topRight.click();

      expect(topLeft.textContent).toBe("X");
      expect(topMiddle.textContent).toBe("X");
      expect(topRight.textContent).toBe("X");
    });

    it("handles diagonal winning conditions", async () => {
      render(<Main />);
      const diagTopLeft = screen.getByTestId("cell-0-0");
      const diagMiddle = screen.getByTestId("cell-1-1");
      const diagBottomRight = screen.getByTestId("cell-2-2");

      await diagTopLeft.click();
      await screen.getByTestId("cell-0-1").click();
      await diagMiddle.click();
      await screen.getByTestId("cell-0-2").click();
      await diagBottomRight.click();

      expect(diagTopLeft.textContent).toBe("X");
      expect(diagMiddle.textContent).toBe("X");
      expect(diagBottomRight.textContent).toBe("X");
    });
  });
});
