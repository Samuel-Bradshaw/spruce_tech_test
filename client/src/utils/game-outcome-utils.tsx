import { CellState, GameResult, XorO } from "../types";
import { MIN_BOARD_LENGTH } from "../constants";
import { getBoardLength } from "./board-utils";

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
  const boardLength = getBoardLength(board);
  for (let i = 0; i < boardLength; i++) {
    const rowStartIdx = i * boardLength;
    const firstCell = board[rowStartIdx];
    if (firstCell == undefined) continue;

    let isRowWin = true;
    for (let j = 1; j < boardLength; j++) {
      if (board[rowStartIdx + j] !== firstCell) {
        isRowWin = false;
        break;
      }
    }
    if (isRowWin) {
      return firstCell;
    }
  }

  return null;
}

function getIfVerticalWinner(board: CellState[]): XorO | null {
  const boardLength = getBoardLength(board);
  for (let colIdx = 0; colIdx < boardLength; colIdx++) {
    const firstColCell = board[colIdx];
    if (firstColCell == undefined) continue;

    let isColWin = true;
    for (let rowIdx = 1; rowIdx < boardLength; rowIdx++) {
      const nextCellDown = board[colIdx + boardLength * rowIdx];
      if (nextCellDown !== firstColCell) {
        isColWin = false;
        break;
      }
    }
    if (isColWin) {
      return firstColCell;
    }
  }

  return null;
}

function getIfDiagonalWinner(board: CellState[]): XorO | null {
  const boardLength = getBoardLength(board);

  const topLeftCell = board[0];
  if (topLeftCell && isLeftDownwardWin(topLeftCell, board, boardLength)) {
    return topLeftCell;
  }

  const topRightCell = board[boardLength - 1];
  if (topRightCell && isRightDownwardWin(topRightCell, board, boardLength)) {
    return topRightCell;
  }

  return null;
}

function isLeftDownwardWin(
  topLeftCell: XorO,
  board: CellState[],
  boardLength: number,
) {
  return (
    topLeftCell === board[boardLength + 1] &&
    topLeftCell === board[boardLength * 2 + 2]
  );
}

function isRightDownwardWin(
  topRightCell: XorO,
  board: CellState[],
  boardLength: number,
) {
  const topRightCellIdx = boardLength - 1;
  const distanceToNextDiag = boardLength - 1;
  return (
    topRightCell === board[topRightCellIdx + distanceToNextDiag] &&
    topRightCell === board[topRightCellIdx + distanceToNextDiag * 2]
  );
}
