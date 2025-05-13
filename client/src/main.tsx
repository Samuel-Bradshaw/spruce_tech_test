import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { postResult } from "./api/stats";
import Board from "./components/Board";
import GameFinishedModal from "./components/GameFinishedModal";
import GameStatsDisplayContainer from "./components/GameStatsDisplayContainer";
import ResetForm from "./components/ResetForm";
import { BoardGrid, BoardState, XorO } from "./types";
import { assessBoardState } from "./utils/assessBoardState";

export const Main = () => {
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("O");
  const [board, setBoard] = useState<BoardGrid>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [boardState, setBoardState] = useState<BoardState>(
    BoardState.InProgress
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [boardSize, setBoardSize] = useState<number>(3);

  const queryClient = useQueryClient();

  useEffect(() => {
    const boardState = assessBoardState(board);
    setBoardState(boardState);
    if (boardState !== BoardState.InProgress) {
      let result;
      if (boardState === BoardState.XWin) {
        result = "X";
      } else if (boardState === BoardState.OWin) {
        result = "O";
      } else if (boardState === BoardState.Draw) {
        result = "draw";
      }
      postResult(result).then(() =>
        queryClient.invalidateQueries({ queryKey: ["stats"] })
      );
      setModalOpen(true);
    }
  }, [board]);

  const resetGame = (): void => {
    setBoard(
      Array(boardSize)
        .fill(undefined)
        .map(() => Array(boardSize).fill(undefined))
    );
    setBoardState(BoardState.InProgress);
  };

  return (
    <>
      <div className="flex flex-col mt-10 items-center gap-10">
        <h1
          className="
            text-4xl sm:text-5xl font-bold tracking-wide
            text-slate-800 dark:text-slate-200
          "
        >
          Tic Tac Toe
        </h1>

        <div className="font-bold text-l">Current Player: {currentPlayer}</div>
        <GameStatsDisplayContainer />
        <Board
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          boardState={boardState}
        />
        <ResetForm
          boardSize={boardSize}
          setBoardSize={setBoardSize}
          resetGame={resetGame}
        />
      </div>
      {modalOpen && (
        <GameFinishedModal
          boardState={boardState}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};
