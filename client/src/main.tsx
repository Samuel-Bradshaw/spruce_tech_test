import React, { useState, useMemo, useCallback } from "react";
import { CellState } from "./types";
import { OutcomeView } from "./components/OutcomeView";
import { getIfGameOutcome } from "./utils/game-outcome-utils";
import { GameBoard } from "./components/game/GameBoard";
import { UserInput } from "./components/UserInput";
import { DEFAULT_BOARD_LENGTH } from "./constants";

export const Main = () => {
  const [boardLength, setBoardLength] = useState<number | undefined>(
    DEFAULT_BOARD_LENGTH,
  );

  const [board, setBoard] = useState<CellState[]>(
    getEmptyBoard(boardLength ?? DEFAULT_BOARD_LENGTH),
  );
  const gameOutcome = useMemo(() => getIfGameOutcome(board), [board]);
  const [resetKey, setResetKey] = useState(0);
  const resetBoard = useCallback(() => {
    setBoard(getEmptyBoard(boardLength ?? DEFAULT_BOARD_LENGTH));
    setResetKey((prev) => ++prev);
  }, [boardLength]);

  return (
    <>
      {<UserInput setBoardLength={setBoardLength} />}
      {<GameBoard key={resetKey} board={board} updateBoard={setBoard} />}
      {gameOutcome && (
        <OutcomeView outcome={gameOutcome} resetBoard={resetBoard} />
      )}
    </>
  );
};

function getEmptyBoard(sideLength: number) {
  return Array(sideLength * sideLength).fill(undefined);
}
