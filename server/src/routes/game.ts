import { Router, Request, Response } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'
import { prisma } from '../db'
import { CreateGameBody } from '../types'

const router = Router()

router.post(
  '/',
  validate([
    body('boardSize').isInt({ min: 3, max: 15 }),
    body('playerX').isString().trim().notEmpty(),
    body('playerO').isString().trim().notEmpty(),
    body('winner').optional({ values: 'null' }).isString().trim().notEmpty(),
    body('playerO').custom((value, { req }) => {
      if (value === req.body.playerX) throw new Error('must be different from playerX')
      return true
    }),
    body('winner').custom((value, { req }) => {
      if (value && ![req.body.playerX, req.body.playerO].includes(value)) {
        throw new Error('must be one of the players')
      }
      return true
    }),
  ]),
  async (req: Request<object, object, CreateGameBody>, res: Response) => {
    const { boardSize, playerX, playerO, winner } = req.body

    try {
      await prisma.game.create({
        data: {
          boardSize,
          playerX: { connect: { name: playerX } },
          playerO: { connect: { name: playerO } },
          winner: winner ? { connect: { name: winner } } : undefined,
        },
      })

      res.status(201).json({ success: true })
    } catch {
      res.status(422).json({ error: 'Player not found' })
    }
  },
)

export default router

