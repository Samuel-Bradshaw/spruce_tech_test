import React from 'react'
import { useGameState } from '../hooks/useGameState'
import { Board } from './Board'
import { GameStatus } from './GameStatus'

export const Game: React.FC = () => {
  const { board, currentPlayer, winner, isDraw, gameOver, playMove, resetGame } = useGameState()

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>

      <GameStatus 
        winner={winner} 
        isDraw={isDraw}
        currentPlayer={currentPlayer} 
      />

      <Board 
        board={board} 
        disabled={gameOver} 
        onCellClick={playMove} 
      />

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

