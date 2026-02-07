import React from 'react'
import { Cell as CellValue, Player } from '../types'

interface CellProps {
  value: CellValue
  disabled: boolean
  onClick: () => void
}

export const Cell: React.FC<CellProps> = ({ value, disabled, onClick }) => (
  <div
    className={`border-2 border-gray-900 w-14 h-14 cursor-pointer items-center justify-center text-2xl font-bold flex
      ${!value && !disabled ? 'hover:bg-gray-100' : ''}
      ${value === Player.X ? 'text-blue-600' : value === Player.O ? 'text-red-500' : ''}`}
    onClick={onClick}
  >
    {value}
  </div>
)

