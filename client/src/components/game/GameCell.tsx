import React from "react";
import { CellState } from "../../types";

type GameCellProps = {
  cellState: CellState;
  cellIndex: number;
  onCellClick: (cellIdx: number) => void;
};

function GameCellFn({
  cellState,
  cellIndex,
  onCellClick,
}: GameCellProps): React.JSX.Element {
  return (
    <div
      className="border-2 border-border-primary bg-background-primary w-20 h-20 cursor-pointer items-center justify-center text-3xl font-bold flex rounded-md transition-all duration-200 hover:bg-background-secondary hover:border-accent-sage hover:scale-105 active:scale-95 text-border-light"
      data-testid={`cell-${cellIndex}`}
      onClick={() => onCellClick(cellIndex)}
    >
      {cellState}
    </div>
  );
}

export const GameCell = React.memo(GameCellFn);
