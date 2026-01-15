import React, { createContext, ReactNode, useState } from "react";
import { CellState, XorO } from "../types";
import { declareWinner, makeMove, startGame } from "../services/hono-client";

export type GameSession = {
  board?: CellState[];
  boardLength?: number;
  activePlayer: XorO;
  gameId?: string;
  startNewGame: (length: number) => void;
  finishGame: () => void;
  makeGameMove: (index: number) => void;
};

export const GameSessionContext = createContext<GameSession | undefined>(
  undefined,
);

type GameSessionProviderProps = {
  children: ReactNode;
  onGameFinished?: () => void;
};

export const GameSessionProvider = ({
  children,
  onGameFinished,
}: GameSessionProviderProps) => {
  const [board, setBoard] = useState<CellState[]>();
  const [activePlayer, setActivePlayer] = useState<XorO>("X");
  const [gameId, setGameId] = useState<string>();

  const boardLength = board ? Math.sqrt(board.length) : undefined;

  const startNewGame = async (length: number) => {
    const newGame = await startGame(length);
    setActivePlayer("X");
    setGameId(newGame.id);
    setBoard(Array(newGame.boardSize).fill(undefined));
  };

  const finishGame = async () => {
    if (!gameId) return;
    await declareWinner(gameId, activePlayer);
    setGameId(undefined);
    setBoard(undefined);
    onGameFinished?.();
  };

  const makeGameMove = async (index: number) => {
    if (!gameId) return;
    if (!board || board[index] !== undefined) return; // Cell already occupied

    const newBoard = await makeMove(gameId, activePlayer, index, board);

    newBoard[index] = activePlayer;
    setBoard(newBoard);
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <GameSessionContext.Provider
      value={{
        board,
        boardLength,
        activePlayer,
        gameId,
        startNewGame,
        finishGame,
        makeGameMove,
      }}
    >
      {children}
    </GameSessionContext.Provider>
  );
};
