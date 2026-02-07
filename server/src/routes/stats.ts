import { Router, Request, Response } from 'express'
import { query } from 'express-validator'
import { Player, Game } from '@prisma/client'
import { validate } from '../middleware/validate'
import { prisma } from '../db'
import { PlayerStats, StatsQuery } from '../types'

export type PlayerWithGames = Player & {
  gamesAsX: Game[]
  gamesAsO: Game[]
  gamesWon: Game[]
}

const router = Router()

export const toStats = (player: PlayerWithGames): PlayerStats => {
  const allGames = [...player.gamesAsX, ...player.gamesAsO]
  const draws = allGames.filter(g => g.winnerId === null).length

  return {
    symbol: player.name,
    wins: player.gamesWon.length,
    losses: allGames.length - player.gamesWon.length - draws,
    draws,
  }
}

router.get(
  '/',
  validate([
    query('players').isString().trim().notEmpty().withMessage('comma-separated player names required'),
  ]),
  async (req: Request<object, object, object, StatsQuery>, res: Response<PlayerStats[]>) => {
    const names = req.query.players!.split(',').map(n => n.trim()).filter(Boolean)

    const players = await prisma.player.findMany({
      where: { name: { in: names } },
      include: { gamesAsX: true, gamesAsO: true, gamesWon: true },
      orderBy: { name: 'asc' },
    })

    res.json(players.map(toStats))
  },
)

export default router
