import { PlayerStats } from './types'

export const fetchStats = async (players: string[]): Promise<PlayerStats[]> => {
  const res = await fetch(`/api/stats?players=${players.join(',')}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.status}`)
  }
  return res.json() as Promise<PlayerStats[]>
}

export const saveGame = async (
  boardSize: number,
  playerX: string,
  playerO: string,
  winner?: string
): Promise<{ success: boolean }> => {
  const res = await fetch('/api/game', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ boardSize, playerX, playerO, winner: winner ?? null }),
  })
  if (!res.ok) {
    throw new Error(`Failed to save game: ${res.status}`)
  }
  return res.json() as Promise<{ success: boolean }>
}

