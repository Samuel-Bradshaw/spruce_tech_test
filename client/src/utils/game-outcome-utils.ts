import { CellState, GameResult, XorO } from "../types";
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
  const downwardDiagonalOutcome = getIfDownwardDiagWin(board);
  if (downwardDiagonalOutcome) return downwardDiagonalOutcome;

  const upwardDiagonalOutcome = getIfUpwardDiagWin(board);
  if (upwardDiagonalOutcome) return upwardDiagonalOutcome;

  return null;
}

function getIfDownwardDiagWin(board: CellState[]): XorO | null {
  const topLeftCell = board[0];
  if (!topLeftCell) return null;

  const boardLength = getBoardLength(board);
  for (let i = 1; i < boardLength; i++) {
    const nextDiagIdx = i * boardLength + i; // next row, plus next column
    if (board[nextDiagIdx] !== topLeftCell) {
      return null;
    }
  }

  return topLeftCell;
}

function getIfUpwardDiagWin(board: CellState[]): XorO | null {
  const boardLength = getBoardLength(board);
  const topRightCell = board[boardLength - 1];
  if (!topRightCell) return null;

  for (let i = 1; i < boardLength; i++) {
    const nextDiagIdx = boardLength - 1 + (boardLength - 1) * i; //
    if (board[nextDiagIdx] !== topRightCell) {
      return null;
    }
  }
  return topRightCell;
}
