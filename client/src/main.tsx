import React, { useState } from 'react'
import { Player } from './types'

type Board = (Player | undefined)[][]

const createBoard = (): Board => [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
]

const checkWinner = (board: Board): Player | undefined => {
  const size = board.length

  for (let i = 0; i < size; i++) {
    // Check row
    if (board[i][0] && board[i].every(cell => cell === board[i][0])) return board[i][0]
    // Check column
    if (board[0][i] && board.every(row => row[i] === board[0][i])) return board[0][i]
  }

  // Check diagonals
  if (board[0][0] && board.every((row, i) => row[i] === board[0][0])) return board[0][0]
  if (board[0][size - 1] && board.every((row, i) => row[size - 1 - i] === board[0][size - 1])) return board[0][size - 1]

  return undefined
}

const isBoardFull = (board: Board): boolean =>
  board.every(row => row.every(cell => cell !== undefined))

export const Main = () => {

  const [board, setBoard] = useState<Board>(createBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X)
  const [winner, setWinner] = useState<Player | undefined>()
  const [isDraw, setIsDraw] = useState(false)

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || winner || isDraw) return

    const newBoard = board.map((r: (Player | undefined)[]) => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
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

  const gameOver = winner || isDraw;

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>

      <div className='text-lg font-semibold'>
        {winner && <span>Player <span className='text-green-600'>{winner}</span> wins!</span>}
        {isDraw && <span className='text-yellow-600'>It's a draw!</span>}
        {!gameOver && <span>Player <span className='text-blue-600'>{currentPlayer}</span>'s turn</span>}
      </div>

      <div className='flex flex-col gap-1'>
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className='flex gap-1'>
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className={`border-2 border-gray-900 w-14 h-14 cursor-pointer items-center justify-center text-2xl font-bold flex
                  ${!cell && !gameOver ? 'hover:bg-gray-100' : ''}
                  ${cell === Player.X ? 'text-blue-600' : 'text-red-500'}`}
                onClick={() => handleCellClick(rowIdx, colIdx)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <button
          onClick={resetGame}
          className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'
        >
          New Game
        </button>
      )}
    </div>
  )
}
