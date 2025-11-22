import React, { useState } from "react";
import { CellState } from "./types";

export const Main = () => {
  const [board, setBoard] = useState<CellState[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col gap-1">
        {board.map((row, rowIndex) => (
          <GameRow key={rowIndex} row={row} rowIndex={rowIndex} />
        ))}
      </div>
    </div>
  );
};

function GameRow(props: {
  row: CellState[];
  rowIndex: number;
}): React.JSX.Element {
  return (
    <div className="flex gap-1">
      {props.row.map((cell, colIndex) => (
        <GameCell
          key={colIndex}
          cell={cell}
          rowIndex={props.rowIndex}
          colIndex={colIndex}
        />
      ))}
    </div>
  );
}

function GameCell(props: {
  cell: CellState;
  rowIndex: number;
  colIndex: number;
}): React.JSX.Element {
  return (
    <div
      className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
      data-testid={`cell-${props.rowIndex}-${props.colIndex}`}
    >
      {props.cell}
    </div>
  );
}
