import { useState } from 'react'
import { Board } from '../types'
import { createBoard, checkWinner, isBoardFull, getCurrentPlayer, DEFAULT_BOARD_SIZE } from '../utils/game'

export const useGameState = () => {
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE)
  const [board, setBoard] = useState<Board>(() => createBoard(boardSize))

  const currentPlayer = getCurrentPlayer(board)
  const winner = checkWinner(board)
  const isDraw = !winner && isBoardFull(board)
  const gameOver = !!winner || isDraw
  const hasStarted = board.flat().some(Boolean)

  const playMove = (row: number, col: number) => {
    if (board[row][col] || gameOver) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)
  }

  const resetGame = () => setBoard(createBoard(boardSize))

  const changeBoardSize = (size: number) => {
    setBoardSize(size)
    setBoard(createBoard(size))
  }

  return { board, boardSize, currentPlayer, winner, isDraw, gameOver, hasStarted, playMove, resetGame, changeBoardSize }
}

