import { Player } from '../src/types'
import { createBoard, checkWinner, isBoardFull, getCurrentPlayer } from '../src/utils/game'

const X = Player.X
const O = Player.O
const _ = undefined

describe('createBoard', () => {
  it('creates a 3x3 board by default', () => {
    const board = createBoard()
    expect(board).toHaveLength(3)
    expect(board.every(row => row.length === 3)).toBe(true)
    expect(board.flat().every(cell => cell === undefined)).toBe(true)
  })

  it('creates a board of the given size', () => {
    const board = createBoard(5)
    expect(board).toHaveLength(5)
    expect(board[0]).toHaveLength(5)
  })
})

describe('checkWinner', () => {
  it('returns undefined for empty board', () => {
    expect(checkWinner(createBoard())).toBeUndefined()
  })

  it('detects row win', () => {
    expect(checkWinner([
      [X, X, X],
      [O, O, _],
      [_, _, _],
    ])).toBe(X)
  })

  it('detects column win', () => {
    expect(checkWinner([
      [O, X, _],
      [O, X, _],
      [_, X, _],
    ])).toBe(X)
  })

  it('detects diagonal win (top-left to bottom-right)', () => {
    expect(checkWinner([
      [X, O, _],
      [O, X, _],
      [_, _, X],
    ])).toBe(X)
  })

  it('detects diagonal win (top-right to bottom-left)', () => {
    expect(checkWinner([
      [_, O, O],
      [X, O, _],
      [O, _, X],
    ])).toBe(O)
  })

  it('returns undefined when no winner', () => {
    expect(checkWinner([
      [X, O, X],
      [O, X, O],
      [O, X, _],
    ])).toBeUndefined()
  })

  it('works on larger boards', () => {
    const board = createBoard(4)
    board[0][0] = X; board[0][1] = X; board[0][2] = X; board[0][3] = X
    expect(checkWinner(board)).toBe(X)
  })
})

describe('isBoardFull', () => {
  it('returns false for empty board', () => {
    expect(isBoardFull(createBoard())).toBe(false)
  })

  it('returns true when all cells filled', () => {
    expect(isBoardFull([
      [X, O, X],
      [O, X, O],
      [O, X, O],
    ])).toBe(true)
  })

  it('returns false with one empty cell', () => {
    expect(isBoardFull([
      [X, O, X],
      [O, X, O],
      [O, X, _],
    ])).toBe(false)
  })
})

describe('getCurrentPlayer', () => {
  it('returns X for empty board', () => {
    expect(getCurrentPlayer(createBoard())).toBe(X)
  })

  it('returns O after one move', () => {
    expect(getCurrentPlayer([
      [X, _, _],
      [_, _, _],
      [_, _, _],
    ])).toBe(O)
  })

  it('returns X after two moves', () => {
    expect(getCurrentPlayer([
      [X, O, _],
      [_, _, _],
      [_, _, _],
    ])).toBe(X)
  })
})

