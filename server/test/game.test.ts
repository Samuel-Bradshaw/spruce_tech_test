import { body, validationResult } from 'express-validator'

const validations = [
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
]

const runValidation = async (reqBody: Record<string, unknown>) => {
  const req = { body: reqBody } as any
  await Promise.all(validations.map(v => v.run(req)))
  return validationResult(req)
}

describe('POST /game validation', () => {
  const validBody = { boardSize: 3, playerX: 'X', playerO: 'O', winner: 'X' }

  it('accepts a valid payload', async () => {
    const result = await runValidation(validBody)
    expect(result.isEmpty()).toBe(true)
  })

  it('accepts a draw (winner: null)', async () => {
    const result = await runValidation({ ...validBody, winner: null })
    expect(result.isEmpty()).toBe(true)
  })

  it('rejects boardSize below 3', async () => {
    const result = await runValidation({ ...validBody, boardSize: 2 })
    expect(result.isEmpty()).toBe(false)
  })

  it('rejects boardSize above 15', async () => {
    const result = await runValidation({ ...validBody, boardSize: 16 })
    expect(result.isEmpty()).toBe(false)
  })

  it('rejects non-integer boardSize', async () => {
    const result = await runValidation({ ...validBody, boardSize: 3.5 })
    expect(result.isEmpty()).toBe(false)
  })

  it('rejects empty playerX', async () => {
    const result = await runValidation({ ...validBody, playerX: '' })
    expect(result.isEmpty()).toBe(false)
  })

  it('rejects empty playerO', async () => {
    const result = await runValidation({ ...validBody, playerO: '' })
    expect(result.isEmpty()).toBe(false)
  })

  it('rejects playerO equal to playerX', async () => {
    const result = await runValidation({ ...validBody, playerX: 'X', playerO: 'X' })
    expect(result.isEmpty()).toBe(false)
  })

  it('rejects winner not matching either player', async () => {
    const result = await runValidation({ ...validBody, winner: 'Z' })
    expect(result.isEmpty()).toBe(false)
  })

  it('accepts winner matching playerO', async () => {
    const result = await runValidation({ ...validBody, winner: 'O' })
    expect(result.isEmpty()).toBe(true)
  })
})

