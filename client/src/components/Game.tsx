import React from 'react'
import { Player } from '../types'
import { saveGame } from '../api'
import { useGameState } from '../hooks/useGameState'
import { useStats } from '../hooks/useStats'
import { Board } from './Board'
import { BoardSizeInput } from './BoardSizeInput'
import { GameStatus } from './GameStatus'
import { Stats } from './Stats'

export const Game: React.FC = () => {
  const { stats, refreshStats } = useStats()

  const handleGameOver = async ({ boardSize, winner }: { boardSize: number; winner?: Player }) => {
    try {
      await saveGame(boardSize, Player.X, Player.O, winner)
      await refreshStats()
    } catch (err) {
      console.warn('Failed to save game:', err)
    }
  }

  const {
    board,
    boardSize,
    currentPlayer,
    winner,
    isDraw,
    gameOver,
    hasStarted,
    playMove,
    resetGame,
    changeBoardSize
  } = useGameState(handleGameOver)

  return (
    <div className='flex flex-col mt-10 items-center gap-6'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>

      <BoardSizeInput
        value={boardSize}
        disabled={hasStarted}
        onChange={changeBoardSize}
      />

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

      <Stats stats={stats} />
    </div>
  )
}

