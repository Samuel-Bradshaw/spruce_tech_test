import { Board, Player } from '../types'

export const createBoard = (): Board => [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
]

export const checkWinner = (board: Board): Player | undefined => {
  const size = board.length

  for (let i = 0; i < size; i++) {
    if (board[i][0] && board[i].every(cell => cell === board[i][0])) return board[i][0]
    if (board[0][i] && board.every(row => row[i] === board[0][i])) return board[0][i]
  }

  if (board[0][0] && board.every((row, i) => row[i] === board[0][0])) return board[0][0]
  if (board[0][size - 1] && board.every((row, i) => row[size - 1 - i] === board[0][size - 1])) return board[0][size - 1]

  return undefined
}

export const isBoardFull = (board: Board): boolean =>
  board.every(row => row.every(cell => cell !== undefined))

