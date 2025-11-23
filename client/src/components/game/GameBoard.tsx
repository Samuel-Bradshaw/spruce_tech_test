import React from "react";
import { useState, useCallback } from "react";
import { CellState, XorO } from "../../types";
import { GameCell } from "./GameCell";
import { getBoardLength } from "../../utils/board-utils";

type GameBoardProps = {
  board: CellState[];
  updateBoard: React.Dispatch<React.SetStateAction<CellState[]>>;
};

export function GameBoard({ board, updateBoard }: GameBoardProps) {
  const [activePlayer, setActivePlayer] = useState<XorO>("X");

  const handleCellClick = useCallback(
    (cellIdx: number) => {
      const isCellOccupied = !!board[cellIdx];
      if (isCellOccupied) return;

      updateBoard((prev) => {
        const newBoard = [...prev];
        newBoard[cellIdx] = activePlayer;
        return newBoard;
      });

      setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
    },
    [activePlayer, board, updateBoard],
  );

  const boardLength = getBoardLength(board);
  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <h1 className="font-bold text-4xl tracking-tight text-white">
        Tic Tac Toe
      </h1>
      <div
        style={{
          gridTemplateColumns: `repeat(${boardLength}, minmax(0, 1fr))`,
        }}
        className="grid gap-2 p-6 bg-background-secondary rounded-lg shadow-xl"
      >
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
