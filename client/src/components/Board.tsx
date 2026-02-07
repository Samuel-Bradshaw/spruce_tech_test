import React from 'react'
import { Board as BoardType } from '../types'
import { Cell } from './Cell'

interface BoardProps {
  board: BoardType
  disabled: boolean
  onCellClick: (row: number, col: number) => void
}

export const Board: React.FC<BoardProps> = ({ board, disabled, onCellClick }) => (
  <div className='flex flex-col gap-1'>
    {board.map((row, rowIdx) => (
      <div key={rowIdx} className='flex gap-1'>
        {row.map((cell, colIdx) => (
          <Cell
            key={colIdx}
            value={cell}
            size={board.length}
            disabled={disabled}
            onClick={() => onCellClick(rowIdx, colIdx)}
          />
        ))}
      </div>
    ))}
  </div>
)

