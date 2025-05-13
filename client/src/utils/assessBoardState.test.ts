/* ---- NOTE -----
 */

// assessBoardState.test.ts
import { describe, it, expect } from "@jest/globals";
import { BoardGrid, BoardState } from "../types";
import { assessBoardState } from "./assessBoardState";

describe("assessBoardState", () => {
  //row
  it("detects an X row win", () => {
    const board: BoardGrid = [
      ["X", "X", "X"],
      ["O", undefined, "O"],
      [undefined, "O", undefined],
    ];
    expect(assessBoardState(board)).toBe(BoardState.XWin);
  });

  //column
  it("detects an O column win", () => {
    const board: BoardGrid = [
      ["O", "X", "X"],
      ["O", undefined, "X"],
      ["O", "X", undefined],
    ];
    expect(assessBoardState(board)).toBe(BoardState.OWin);
  });

  //down diagnonal
  it("detects an X win on the down diagonal", () => {
    const board: BoardGrid = [
      ["X", "O", undefined],
      ["O", "X", "O"],
      [undefined, "O", "X"],
    ];
    expect(assessBoardState(board)).toBe(BoardState.XWin);
  });

  it("detects an O win on the up diagonal", () => {
    const board: BoardGrid = [
      ["X", "X", "O"],
      ["X", "O", undefined],
      ["O", undefined, "X"],
    ];
    expect(assessBoardState(board)).toBe(BoardState.OWin);
  });

  // draw
  it("detects Draw for a full board with no winner", () => {
    const board: BoardGrid = [
      ["X", "O", "X"],
      ["O", "O", "X"],
      ["X", "X", "O"],
    ];
    expect(assessBoardState(board)).toBe(BoardState.Draw);
  });

  // in progress
  it("detects game in progress if no winners found", () => {
    const board: BoardGrid = [
      ["X", "O", undefined],
      ["O", undefined, "X"],
      [undefined, "X", "O"],
    ];
    expect(assessBoardState(board)).toBe(BoardState.InProgress);
  });

  // larger boards
  it("detects X row win for larger grids", () => {
    const board: BoardGrid = [
      ["X", "X", "X", "X"],
      ["O", "O", undefined, "O"],
      ["O", undefined, "O", "O"],
      ["O", undefined, "O", undefined],
    ];
    expect(assessBoardState(board)).toBe(BoardState.XWin);
  });

  it("detects O column win for larger grids", () => {
    const board: BoardGrid = [
      ["O", "X", undefined, "X"],
      ["O", "X", "X", undefined],
      ["O", undefined, "X", "X"],
      ["O", "X", undefined, undefined],
    ];
    expect(assessBoardState(board)).toBe(BoardState.OWin);
  });

  it("detects O diagonal down win for larger grids", () => {
    const board: BoardGrid = [
      ["O", "X", undefined, "X"],
      ["X", "O", "X", undefined],
      ["O", undefined, "O", "X"],
      ["O", "X", "X", "O"],
    ];
    expect(assessBoardState(board)).toBe(BoardState.OWin);
  });
});
