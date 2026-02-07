import React from 'react'
import { Player } from '../types'

interface GameStatusProps {
  winner: Player | undefined
  isDraw: boolean
  currentPlayer: Player
}

export const GameStatus: React.FC<GameStatusProps> = ({ winner, isDraw, currentPlayer }) => (
  <div className='text-lg font-semibold'>
    {winner && (
      <span>
        <span className='text-green-600'>{winner}</span> wins!
      </span>
    )}
    {isDraw && (
      <span className='text-yellow-600'>It&apos;s a draw!</span>
    )}
    {!winner && !isDraw && (
      <span>
        <span className={currentPlayer === Player.X ? 'text-blue-600' : 'text-red-500'}>{currentPlayer}</span>&apos;s turn
      </span>
    )}
  </div>
)

