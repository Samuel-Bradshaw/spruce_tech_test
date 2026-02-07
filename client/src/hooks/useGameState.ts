import { useState } from 'react'
import { Board, Player } from '../types'
import { createBoard, checkWinner, isBoardFull, getCurrentPlayer, DEFAULT_BOARD_SIZE } from '../utils/game'

interface GameOverResult {
  boardSize: number
  winner?: Player
}

export const useGameState = (onGameOver?: (result: GameOverResult) => void) => {
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

    const moveWinner = checkWinner(newBoard)
    const moveDraw = !moveWinner && isBoardFull(newBoard)
    if (moveWinner || moveDraw) {
      onGameOver?.({ boardSize, winner: moveWinner ?? undefined })
    }
  }

  const resetGame = () => setBoard(createBoard(boardSize))

  const changeBoardSize = (size: number) => {
    setBoardSize(size)
    setBoard(createBoard(size))
  }

  return { board, boardSize, currentPlayer, winner, isDraw, gameOver, hasStarted, playMove, resetGame, changeBoardSize }
}

