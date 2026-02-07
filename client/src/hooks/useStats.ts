import { useState, useEffect } from 'react'
import { PlayerStats } from '../types'
import { fetchStats } from '../api'

export const useStats = () => {
  const [stats, setStats] = useState<PlayerStats[]>([])

  const refreshStats = async () => {
    try {
      setStats(await fetchStats(['X', 'O']))
    } catch {
      // Stats unavailable
    }
  }

  useEffect(() => {
    refreshStats()
  }, [])

  return { stats, refreshStats }
}
