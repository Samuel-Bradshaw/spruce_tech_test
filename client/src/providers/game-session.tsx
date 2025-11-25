import React, { createContext, useContext, useState, ReactNode } from "react";
import { XorO, CellState } from "../types";

type GameSession = {
  board?: CellState[];
  boardLength?: number;
  activePlayer: XorO;
  isGameActive: boolean;
  startNewGame: (length: number) => void;
  finishGame: () => void;
  makeGameMove: (index: number) => void;
};

const GameSessionContext = createContext<GameSession | undefined>(undefined);

export const GameSessionProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<CellState[]>();
  const [activePlayer, setActivePlayer] = useState<XorO>("X");
  const [isGameActive, setIsGameActive] = useState<boolean>(false);

  const boardLength = board ? Math.sqrt(board.length) : undefined;

  const startNewGame = (length: number) => {
    setBoard(Array(length * length).fill(undefined));
    setActivePlayer("X");
    setIsGameActive(true);
  };

  const finishGame = () => {
    setBoard(undefined);
    setIsGameActive(false);
  };

  const makeGameMove = (index: number) => {
    // Cell already occupied
    if (!board || board[index] !== undefined) return;

    const newBoard = [...board];
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
        isGameActive,
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
