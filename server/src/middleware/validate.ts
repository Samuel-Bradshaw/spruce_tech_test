import { Request, Response, NextFunction } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

export const validate = (validations: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(v => v.run(req)))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
    }

    next()
  }

