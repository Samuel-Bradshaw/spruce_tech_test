import React from 'react'
import { CellValue, Player } from '../types'

interface CellProps {
  value: CellValue
  disabled: boolean
  size: number
  onClick: () => void
}

const getCellStyles = (size: number) => {
  if (size <= 5) {
    return { dimension: 'w-14 h-14', text: 'text-2xl' }
  }
  if (size <= 10) {
    return { dimension: 'w-10 h-10', text: 'text-lg' }
  }
  return { dimension: 'w-8 h-8', text: 'text-sm' }
}

export const Cell: React.FC<CellProps> = ({ value, disabled, size, onClick }) => {
  const { dimension, text } = getCellStyles(size)

  const isPlayable = !value && !disabled
  const colorClass = value === Player.X ? 'text-blue-600' : value === Player.O ? 'text-red-500' : ''
  const hoverClass = isPlayable ? 'hover:bg-gray-100' : ''
  const cursorClass = isPlayable ? 'cursor-pointer' : 'cursor-default'

  return (
    <div
      className={`flex items-center justify-center border-2 border-gray-900 font-bold ${dimension} ${text} ${hoverClass} ${cursorClass} ${colorClass}`}
      onClick={isPlayable ? onClick : undefined}
    >
      {value}
    </div>
  )
}
