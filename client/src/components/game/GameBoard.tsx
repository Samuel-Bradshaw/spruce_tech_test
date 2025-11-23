import React from "react";
import { useState, useCallback } from "react";
import { CellState, XorO } from "../../types";
import { GameCell } from "./GameCell";

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
      <h1 className="font-bold text-4xl tracking-tight text-white">
        Tic Tac Toe
      </h1>
      <div className="grid grid-cols-3 gap-2 p-6 bg-background-secondary rounded-lg shadow-xl">
        {board.map((cell, idx) => (
          <GameCell
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
