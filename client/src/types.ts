export enum Player {
  X = 'X',
  O = 'O',
}

export type CellValue = Player | undefined

export type Board = CellValue[][]
