import React, { useEffect, useRef, useCallback } from 'react'
import { Player } from '../types'
import { saveGame } from '../api'
import { useGameState } from '../hooks/useGameState'
import { useStats } from '../hooks/useStats'
import { Board } from './Board'
import { BoardSizeInput } from './BoardSizeInput'
import { GameStatus } from './GameStatus'
import { Stats } from './Stats'

export const Game: React.FC = () => {
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
  } = useGameState()

  const { stats, refreshStats } = useStats()
  
  // Guard against duplicate saves — the effect can re-fire if deps change while the async save is in-flight
  const savingRef = useRef(false)

  const handleGameOver = useCallback(async () => {
    if (savingRef.current) {
      return
    }
    savingRef.current = true

    try {
      await saveGame(boardSize, Player.X, Player.O, winner ?? undefined)
      await refreshStats()
    } catch (err) {
      console.warn('Failed to save game:', err)
    }
  }, [boardSize, winner, refreshStats])

  useEffect(() => {
    if (gameOver) {
      handleGameOver()
    } else {
      savingRef.current = false
    }
  }, [gameOver, handleGameOver])

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

