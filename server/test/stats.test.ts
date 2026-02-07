import { toStats, PlayerWithGames } from '../src/routes/stats'

const makePlayer = (overrides: Partial<PlayerWithGames> = {}): PlayerWithGames => ({
  id: 1,
  name: 'X',
  gamesAsX: [],
  gamesAsO: [],
  gamesWon: [],
  ...overrides,
})

const game = (winnerId: number | null) => ({
  id: 1,
  boardSize: 3,
  playerXId: 1,
  playerOId: 2,
  winnerId,
  completedAt: new Date(),
})

describe('toStats', () => {
  it('returns zeros when player has no games', () => {
    expect(toStats(makePlayer())).toEqual({
      symbol: 'X',
      wins: 0,
      losses: 0,
      draws: 0,
    })
  })

  it('counts wins correctly', () => {
    const player = makePlayer({
      id: 1,
      gamesAsX: [game(1), game(1)],
      gamesWon: [game(1), game(1)],
    })
    expect(toStats(player)).toEqual({
      symbol: 'X',
      wins: 2,
      losses: 0,
      draws: 0,
    })
  })

  it('counts losses correctly', () => {
    const player = makePlayer({
      id: 1,
      gamesAsX: [game(2)],
      gamesWon: [],
    })
    expect(toStats(player)).toEqual({
      symbol: 'X',
      wins: 0,
      losses: 1,
      draws: 0,
    })
  })

  it('counts draws correctly', () => {
    const player = makePlayer({
      id: 1,
      gamesAsX: [game(null)],
      gamesWon: [],
    })
    expect(toStats(player)).toEqual({
      symbol: 'X',
      wins: 0,
      losses: 0,
      draws: 1,
    })
  })

  it('handles mixed results across both sides', () => {
    const player = makePlayer({
      id: 1,
      name: 'O',
      gamesAsX: [game(1)],
      gamesAsO: [game(2), game(null)],
      gamesWon: [game(1)],
    })
    expect(toStats(player)).toEqual({
      symbol: 'O',
      wins: 1,
      losses: 1,
      draws: 1,
    })
  })
})

