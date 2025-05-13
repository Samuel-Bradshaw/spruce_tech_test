import React from 'react';
import { BoardState, XorO } from '../types';

type CellProps = {
  columnValue: XorO | undefined;
  currentPlayer: XorO;
  coords: [number, number];
  onCellClick: (coords: [number, number]) => void;
  boardState: BoardState;
};

const Cell: React.FC<CellProps> = ({
  columnValue,
  currentPlayer,
  coords,
  onCellClick,
  boardState,
}) => {
  return (
    <div
      className="
        group aspect-square grow 
        cursor-pointer flex items-center justify-center 
        font-bold select-none
        text-2xl [container-type:inline-size]
        bg-white
      "
      onClick={() => onCellClick(coords)}
    >
      <div className="w-full flex items-center justify-center">
        {columnValue ? (
          <span className="text-[70cqw]">{columnValue}</span>
        ) : (
          boardState === BoardState.InProgress && (
            <span className="text-[70cqw] opacity-0 group-hover:opacity-30 transition-opacity duration-100">
              {currentPlayer}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Cell;
