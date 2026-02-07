import React from 'react'
import { PlayerStats } from '../types'

interface StatsProps {
  stats: PlayerStats[]
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  if (stats.length === 0) return null

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='text-lg font-semibold'>Stats</div>
      <table className='text-sm'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='px-4 py-1 text-left'>Player</th>
            <th className='px-4 py-1 text-right'>Wins</th>
            <th className='px-4 py-1 text-right'>Losses</th>
            <th className='px-4 py-1 text-right'>Draws</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ symbol, wins, losses, draws }) => (
            <tr key={symbol}>
              <td className='px-4 py-1 font-bold'>{symbol}</td>
              <td className='px-4 py-1 text-right'>{wins}</td>
              <td className='px-4 py-1 text-right'>{losses}</td>
              <td className='px-4 py-1 text-right'>{draws}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

