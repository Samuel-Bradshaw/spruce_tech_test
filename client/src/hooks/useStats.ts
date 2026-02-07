import { useState, useEffect } from 'react'
import { PlayerStats } from '../types'

const parseStats = (data: Record<string, string>[]): PlayerStats[] =>
  data.map(row => ({
    symbol: row.symbol,
    wins: Number(row.wins),
    losses: Number(row.losses),
    draws: Number(row.draws),
  }))

export const useStats = () => {
  const [stats, setStats] = useState<PlayerStats[]>([])

  const refreshStats = async () => {
    try {
      const res = await fetch('/api/stats?players=X,O')
      setStats(parseStats(await res.json()))
    } catch {
      // Stats unavailable
    }
  }

  const saveGame = async (boardSize: number, playerX: string, playerO: string, winner?: string) => {
    try {
      await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boardSize, playerX, playerO, winner: winner ?? null }),
      })
      await refreshStats()
    } catch {
      // Save failed
    }
  }

  useEffect(() => {
    refreshStats()
  }, [])

  return { stats, saveGame }
}
