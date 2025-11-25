import { CellState } from "../types";

export function getBoardLength(board: CellState[]) {
  return Math.sqrt(board.length);
}
