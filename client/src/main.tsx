import React, { useState } from "react";
import { CellState, XorO } from "./types";

export const Main = () => {
  const [board, setBoard] = useState<CellState[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [activePlayer, setActivePlayer] = useState<XorO>("X");
  const togglePlayer = () => {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col gap-1">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <GameCell
                key={colIndex}
                cellState={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                setBoard={setBoard}
                activePlayer={activePlayer}
                togglePlayer={togglePlayer}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

type GameCellProps = {
  cellState: CellState;
  rowIndex: number;
  colIndex: number;
  setBoard: React.Dispatch<React.SetStateAction<CellState[][]>>;
  activePlayer: XorO;
  togglePlayer: () => void;
};

function GameCell({
  cellState,
  rowIndex,
  colIndex,
  setBoard,
  activePlayer,
  togglePlayer,
}: GameCellProps): React.JSX.Element {
  const handleClick = () => {
    setBoard((prev) => {
      if (prev[rowIndex][colIndex]) {
        return prev;
      } else {
        const newBoard = prev.map((row) => [...row]);
        newBoard[rowIndex][colIndex] = activePlayer;
        togglePlayer();
        return newBoard;
      }
    });
  };

  return (
    <div
      className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
      data-testid={`cell-${rowIndex}-${colIndex}`}
      onClick={handleClick}
    >
      {cellState}
    </div>
  );
}
