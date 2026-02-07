import { useState, useEffect, useCallback } from 'react'
import { PlayerStats } from '../types'
import { fetchStats } from '../api'

export const useStats = () => {
  const [stats, setStats] = useState<PlayerStats[]>([])

  const refreshStats = useCallback(async () => {
    try {
      setStats(await fetchStats(['X', 'O']))
    } catch (err) {
      console.warn('Failed to fetch stats:', err)
    }
  }, [])

  useEffect(() => {
    refreshStats()
  }, [refreshStats])

  return { stats, refreshStats }
}
