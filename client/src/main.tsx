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
          <GameRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            setBoard={setBoard}
          />
        ))}
      </div>
    </div>
  );
};

type GameRowProps = {
  row: CellState[];
  rowIndex: number;
  setBoard: React.Dispatch<React.SetStateAction<CellState[][]>>;
};

function GameRow({ row, rowIndex, setBoard }: GameRowProps): React.JSX.Element {
  return (
    <div className="flex gap-1">
      {row.map((cell, colIndex) => (
        <GameCell
          key={colIndex}
          cellState={cell}
          rowIndex={rowIndex}
          colIndex={colIndex}
          setBoard={setBoard}
        />
      ))}
    </div>
  );
}

type GameCellProps = {
  cellState: CellState;
  rowIndex: number;
  colIndex: number;
  setBoard: React.Dispatch<React.SetStateAction<CellState[][]>>;
};

function GameCell({
  cellState,
  rowIndex,
  colIndex,
  setBoard,
}: GameCellProps): React.JSX.Element {
  return (
    <div
      className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
      data-testid={`cell-${rowIndex}-${colIndex}`}
      onClick={() =>
        setBoard((prev) => {
          const newBoard = prev.map((row) => [...row]);
          newBoard[rowIndex][colIndex] = "X";
          return newBoard;
        })
      }
    >
      {cellState}
    </div>
  );
}
