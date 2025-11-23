import React, { useState, useMemo, useCallback, useEffect } from "react";
import { CellState } from "./types";
import { OutcomeView } from "./components/OutcomeView";
import { getIfGameOutcome } from "./utils/game-outcome-utils";
import { GameBoard } from "./components/game/GameBoard";
import { UserInput } from "./components/UserInput";
import { MIN_BOARD_LENGTH } from "./constants";
import { getEmptyBoard } from "./utils/board-utils";

export const Main = () => {
  const [boardLength, setBoardLength] = useState<number | undefined>();
  const [board, setBoard] = useState<CellState[]>(
    getEmptyBoard(MIN_BOARD_LENGTH),
  );

  useEffect(() => {
    if (boardLength) {
      setBoard(getEmptyBoard(boardLength));
    }
  }, [boardLength]);

  // reset key forces remounting of GameBoard on win/draw
  const [resetKey, setResetKey] = useState(0);
  const resetBoard = useCallback(() => {
    setBoard(getEmptyBoard(boardLength ?? MIN_BOARD_LENGTH));
    setResetKey((prev) => ++prev);
  }, [boardLength]);

  const gameOutcome = useMemo(() => getIfGameOutcome(board), [board]);

  return (
    <>
      <UserInput setBoardLength={setBoardLength} isOpen={!boardLength} />
      {<GameBoard key={resetKey} board={board} updateBoard={setBoard} />}
      {gameOutcome && (
        <OutcomeView outcome={gameOutcome} resetBoard={resetBoard} />
      )}
    </>
  );
};
