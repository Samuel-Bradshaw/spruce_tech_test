import React, { useState, useMemo } from "react";
import { CellState } from "./types";
import { WinnerModal } from "./components/WinnerModal";
import { getIfWinner } from "./helpers/winning-conditions-helpers";
import { GameBoard } from "./components/GameBoard";

export const BOARD_LENGTH = 3;
const EMPTY_BOARD = Array(BOARD_LENGTH * BOARD_LENGTH).fill(undefined);

export const Main = () => {
  const [board, setBoard] = useState<CellState[]>(EMPTY_BOARD);
  const winner = useMemo(() => getIfWinner(board), [board]);
  const [resetKey, setResetKey] = useState(0);
  const resetBoard = () => {
    setBoard(EMPTY_BOARD);
    setResetKey((prev) => ++prev);
  };

  return (
    <>
      {<GameBoard key={resetKey} board={board} setBoard={setBoard} />}
      {winner && <WinnerModal winner={winner} resetBoard={resetBoard} />}
    </>
  );
};
