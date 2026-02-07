import { useState } from 'react'
import { Board } from '../types'
import { createBoard, checkWinner, isBoardFull, getCurrentPlayer } from '../utils/game'

export const useGameState = () => {
  const [board, setBoard] = useState<Board>(createBoard)

  const currentPlayer = getCurrentPlayer(board)
  const winner = checkWinner(board)
  const isDraw = !winner && isBoardFull(board)
  const gameOver = !!winner || isDraw

  const playMove = (row: number, col: number) => {
    if (board[row][col] || gameOver) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)
  }

  const resetGame = () => setBoard(createBoard())

  return { board, currentPlayer, winner, isDraw, gameOver, playMove, resetGame }
}

