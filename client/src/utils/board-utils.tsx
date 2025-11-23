import { CellState } from "../types";

export function getEmptyBoard(sideLength: number): undefined[] {
  return Array(sideLength * sideLength).fill(undefined);
}

export function getBoardLength(board: CellState[]) {
  return Math.sqrt(board.length);
}
