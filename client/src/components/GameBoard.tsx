import React from "react";
import { useState, useCallback } from "react";
import { CellState, XorO } from "../types";

type GameBoardProps = {
  board: CellState[];
  setBoard: React.Dispatch<React.SetStateAction<CellState[]>>;
};

export function GameBoard({ board, setBoard }: GameBoardProps) {
  const [activePlayer, setActivePlayer] = useState<XorO>("X");
  const togglePlayer = useCallback(() => {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  }, []);

  const handleCellClick = useCallback(
    (cellIdx: number) => {
      setBoard((prev) => {
        const isCellOccupied = !!prev[cellIdx];
        if (isCellOccupied) return prev;

        const newBoard = [...prev];
        newBoard[cellIdx] = activePlayer;
        togglePlayer();
        return newBoard;
      });
    },
    [activePlayer, setBoard, togglePlayer],
  );

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <h1 className="font-bold text-4xl tracking-tight text-white">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 p-6 bg-background-secondary rounded-lg shadow-xl">
        {board.map((cell, idx) => (
          <GameCellMemo
            key={idx}
            cellState={cell}
            cellIndex={idx}
            onCellClick={handleCellClick}
          />
        ))}
      </div>
    </div>
  );
}

type GameCellProps = {
  cellState: CellState;
  cellIndex: number;
  onCellClick: (cellIdx: number) => void;
};

const GameCellMemo = React.memo(GameCell);
function GameCell({
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
