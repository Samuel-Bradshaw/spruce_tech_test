import { useState } from 'react'
import { Board, Player } from '../types'
import { createBoard, checkWinner, isBoardFull } from '../utils/game'

export const useGameState = () => {
  const [board, setBoard] = useState<Board>(createBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X)
  const [winner, setWinner] = useState<Player | undefined>()
  const [isDraw, setIsDraw] = useState(false)

  const gameOver = !!winner || isDraw

  const playMove = (row: number, col: number) => {
    if (board[row][col] || gameOver) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result)
    } else if (isBoardFull(newBoard)) {
      setIsDraw(true)
    } else {
      setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X)
    }
  }

  const resetGame = () => {
    setBoard(createBoard())
    setCurrentPlayer(Player.X)
    setWinner(undefined)
    setIsDraw(false)
  }

  return { board, currentPlayer, winner, isDraw, gameOver, playMove, resetGame }
}

