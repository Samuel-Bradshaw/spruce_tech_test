export interface CreateGameBody {
  boardSize: number
  playerX: string
  playerO: string
  winner: string | null
}

export interface PlayerStats {
  symbol: string
  wins: number
  losses: number
  draws: number
}

export interface StatsQuery {
  players?: string
}

