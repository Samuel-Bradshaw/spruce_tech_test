import express from 'express'
import { prisma } from './db'
import gameRouter from './routes/game'
import statsRouter from './routes/stats'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/game', gameRouter)
app.use('/api/stats', statsRouter)

const start = async () => {
  await Promise.all(
    ['X', 'O'].map(name =>
      prisma.player.upsert({ where: { name }, update: {}, create: { name } })
    )
  )

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
