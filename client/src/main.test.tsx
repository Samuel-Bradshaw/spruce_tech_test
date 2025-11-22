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

    const cell = screen.getByTestId("cell-0-0");
    await cell.click();

    expect(cell.textContent).toBe("X");
  });
});
