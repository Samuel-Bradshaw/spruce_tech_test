import { CellState } from "../types";
import { getIfGameOutcome } from "./game-outcome-utils";

describe("Winning Conditions Helpers", () => {
  it("returns null for an empty board", () => {
    const board: CellState[] = Array(9).fill(undefined);

    expect(getIfGameOutcome(board)).toBeNull();
  });

  it("returns null when there is no winner", () => {
    const board: CellState[] = [
      "X",
      "O",
      "X",
      "O",
      "X",
      "O",
      "O",
      "X",
      undefined,
    ];

    expect(getIfGameOutcome(board)).toBeNull();
  });

  describe("vertical winning conditions", () => {
    it("detects vertical win in first column", () => {
      const board: CellState[] = [
        "X",
        "O",
        "O",
        "X",
        "O",
        undefined,
        "X",
        undefined,
        undefined,
      ];

      expect(getIfGameOutcome(board)).toBe("X");
    });

    it("detects vertical win in middle column", () => {
      const board: CellState[] = [
        "O",
        "X",
        "O",
        undefined,
        "X",
        "O",
        undefined,
        "X",
        undefined,
      ];

      expect(getIfGameOutcome(board)).toBe("X");
    });

    it("detects vertical win in last column", () => {
      const board: CellState[] = [
        "X",
        "O",
        "O",
        "X",
        undefined,
        "O",
        undefined,
        undefined,
        "O",
      ];

      expect(getIfGameOutcome(board)).toBe("O");
    });
  });

  describe("horizontal winning conditions", () => {
    it("detects horizontal win in first row", () => {
      const board: CellState[] = [
        "X",
        "X",
        "X",
        "O",
        "O",
        undefined,
        undefined,
        undefined,
        undefined,
      ];

      expect(getIfGameOutcome(board)).toBe("X");
    });

    it("detects horizontal win in middle row", () => {
      const board: CellState[] = [
        "O",
        "X",
        undefined,
        "X",
        "X",
        "X",
        "O",
        "O",
        undefined,
      ];

      expect(getIfGameOutcome(board)).toBe("X");
    });

    it("detects horizontal win in last row", () => {
      const board: CellState[] = [
        "X",
        "O",
        "X",
        "X",
        "O",
        undefined,
        "O",
        "O",
        "O",
      ];

      expect(getIfGameOutcome(board)).toBe("O");
    });
  });

  describe("diagonal winning conditions", () => {
    it("detects left diagonal win (top-left to bottom-right)", () => {
      const board: CellState[] = [
        "X",
        "O",
        "O",
        undefined,
        "X",
        "O",
        undefined,
        undefined,
        "X",
      ];

      expect(getIfGameOutcome(board)).toBe("X");
    });

    it("detects right diagonal win (top-right to bottom-left)", () => {
      const board: CellState[] = [
        "O",
        "X",
        "O",
        "X",
        "O",
        undefined,
        "O",
        undefined,
        "X",
      ];

      expect(getIfGameOutcome(board)).toBe("O");
    });
  });
});
