import { CellState, GameResult, XorO } from "../types";
import { MIN_BOARD_LENGTH } from "../constants";

export function getIfGameOutcome(board: CellState[]): GameResult | null {
  const verticalWinner = getIfVerticalWinner(board);
  if (verticalWinner) return verticalWinner;

  const horizontalWinner = getIfHorizontalWinner(board);
  if (horizontalWinner) return horizontalWinner;

  const diagonalWinner = getIfDiagonalWinner(board);
  if (diagonalWinner) return diagonalWinner;

  if (board.every((cell) => cell !== undefined)) {
    return "TIE";
  }

  return null;
}

function getIfHorizontalWinner(board: CellState[]): XorO | null {
  for (let i = 0; i < MIN_BOARD_LENGTH; i++) {
    const rowStartIdx = i * MIN_BOARD_LENGTH;
    const firstCell = board[rowStartIdx];
    if (firstCell == undefined) continue;

    if (
      firstCell &&
      firstCell === board[rowStartIdx + 1] &&
      firstCell === board[rowStartIdx + 2]
    ) {
      return firstCell;
    }
  }

  return null;
}

function getIfVerticalWinner(board: CellState[]): XorO | null {
  for (let i = 0; i < MIN_BOARD_LENGTH; i++) {
    const firstCell = board[i];
    if (firstCell == undefined) continue;
    if (
      firstCell &&
      firstCell === board[i + MIN_BOARD_LENGTH] &&
      firstCell === board[i + MIN_BOARD_LENGTH * 2]
    ) {
      return firstCell;
    }
  }

  return null;
}

function getIfDiagonalWinner(board: CellState[]): XorO | null {
  const topLeftCell = board[0];
  if (topLeftCell && isLeftDownwardWin(topLeftCell, board)) {
    return topLeftCell;
  }

  const topRightCell = board[MIN_BOARD_LENGTH - 1];
  if (topRightCell && isRightDownwardWin(topRightCell, board)) {
    return topRightCell;
  }

  return null;
}

function isLeftDownwardWin(topLeftCell: XorO, board: CellState[]) {
  return (
    topLeftCell === board[MIN_BOARD_LENGTH + 1] &&
    topLeftCell === board[MIN_BOARD_LENGTH * 2 + 2]
  );
}

function isRightDownwardWin(topRightCell: XorO, board: CellState[]) {
  const topRightCellIdx = MIN_BOARD_LENGTH - 1;
  const distanceToNextDiag = MIN_BOARD_LENGTH - 1;
  return (
    topRightCell === board[topRightCellIdx + distanceToNextDiag] &&
    topRightCell === board[topRightCellIdx + distanceToNextDiag * 2]
  );
}
