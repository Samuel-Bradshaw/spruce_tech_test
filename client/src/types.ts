export enum Player {
  X = 'X',
  O = 'O',
}

export type Cell = Player | undefined

export type Board = Cell[][]
