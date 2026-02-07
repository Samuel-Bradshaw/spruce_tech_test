import { Board, Player } from '../types'

export const DEFAULT_BOARD_SIZE = 3
export const MIN_BOARD_SIZE = 3
export const MAX_BOARD_SIZE = 15

export const createBoard = (size = DEFAULT_BOARD_SIZE): Board =>
  Array.from({ length: size }, () => Array(size).fill(undefined))

export const checkWinner = (board: Board): Player | undefined => {
  const size = board.length

  // Check rows and columns
  for (let i = 0; i < size; i++) {
    if (board[i][0] && board[i].every(cell => cell === board[i][0])) {
      return board[i][0]
    }
    if (board[0][i] && board.every(row => row[i] === board[0][i])) {
      return board[0][i]
    }
  }

  // Check top-left to bottom-right diagonal
  if (board[0][0] && board.every((row, i) => row[i] === board[0][0])) {
    return board[0][0]
  }
  // Check top-right to bottom-left diagonal
  if (board[0][size - 1] && board.every((row, i) => row[size - 1 - i] === board[0][size - 1])) {
    return board[0][size - 1]
  }

  return undefined
}

export const isBoardFull = (board: Board): boolean =>
  board.every(row => row.every(cell => cell !== undefined))

export const getCurrentPlayer = (board: Board): Player => {
  const filledCount = board.flat().filter(Boolean).length
  return filledCount % 2 === 0 ? Player.X : Player.O
}
