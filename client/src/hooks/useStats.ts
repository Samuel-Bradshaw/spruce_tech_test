import { useState, useEffect } from 'react'
import { PlayerStats } from '../types'

export const useStats = () => {
  const [stats, setStats] = useState<PlayerStats[]>([])

  const refreshStats = async () => {
    try {
      const res = await fetch('/api/stats?players=X,O')
      setStats(await res.json() as PlayerStats[])
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
