import React from "react";
import { GameCell } from "./GameCell";
import { useGameSession } from "../../providers/game-session";
import { MIN_BOARD_LENGTH } from "../../constants";

export function GameBoard() {
  const { boardLength, board, makeGameMove } = useGameSession();

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <h1 className="font-bold text-4xl tracking-tight text-white">
        Tic Tac Toe
      </h1>
      <div
        style={{
          gridTemplateColumns: `repeat(${boardLength ?? MIN_BOARD_LENGTH}, minmax(0, 1fr))`,
        }}
        className="grid gap-2 p-6 bg-background-secondary rounded-lg shadow-xl"
      >
        {board &&
          board.map((cell, idx) => (
            <GameCell
              key={idx}
              cellState={cell}
              cellIndex={idx}
              onCellClick={makeGameMove}
            />
          ))}
      </div>
    </div>
  );
}
