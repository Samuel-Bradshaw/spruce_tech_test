import React from 'react'
import { MIN_BOARD_SIZE, MAX_BOARD_SIZE } from '../utils/game'

interface BoardSizeInputProps {
  value: number
  disabled: boolean
  onChange: (size: number) => void
}

export const BoardSizeInput: React.FC<BoardSizeInputProps> = ({ value, disabled, onChange }) => (
  <div className={`flex items-center gap-3 ${disabled ? 'opacity-50' : ''}`}>
    <label className='text-sm font-medium text-gray-700'>Board Size</label>
    <input
      type='range'
      min={MIN_BOARD_SIZE}
      max={MAX_BOARD_SIZE}
      value={value}
      disabled={disabled}
      onChange={e => onChange(Number(e.target.value))}
      className='w-40'
    />
    <span className='text-sm font-semibold w-16 text-center whitespace-nowrap'>{value} × {value}</span>
  </div>
)

