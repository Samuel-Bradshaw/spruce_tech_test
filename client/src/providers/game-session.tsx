import React, { createContext, ReactNode, useContext, useState } from "react";
import { CellState, XorO } from "../types";
import { declareWinner, makeMove, startGame } from "../services/hono-client";

type GameSession = {
  board?: CellState[];
  boardLength?: number;
  activePlayer: XorO;
  gameId?: string;
  startNewGame: (length: number) => void;
  finishGame: () => void;
  makeGameMove: (index: number) => void;
};

const GameSessionContext = createContext<GameSession | undefined>(undefined);

export const GameSessionProvider = ({ children }: { children: ReactNode }) => {
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

  const finishGame = () => {
    if (!gameId) return;
    declareWinner(gameId, activePlayer);
    setGameId(undefined);
    setBoard(undefined);
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

export const useGameSession = (): GameSession => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error("useGameSession must be used within a GameSessionProvider");
  }
  return context;
};
