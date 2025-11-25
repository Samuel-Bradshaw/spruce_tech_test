import React, { createContext, useContext, useState, ReactNode } from "react";
import { XorO, CellState } from "../types";
import { MIN_BOARD_LENGTH } from "../constants";

type GameSession = {
  board: CellState[];
  boardLength: number;
  activePlayer: XorO;
  isLoading: boolean;
  startNewGame: (length: number) => void;
  makeGameMove: (index: number) => void;
};

const GameSessionContext = createContext<GameSession | undefined>(undefined);

export const GameSessionProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<CellState[]>(
    Array(MIN_BOARD_LENGTH * MIN_BOARD_LENGTH).fill(undefined),
  );
  const [boardLength, setBoardLength] = useState<number>(MIN_BOARD_LENGTH);
  const [activePlayer, setActivePlayer] = useState<XorO>("X");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startNewGame = (length: number) => {
    setBoardLength(length);
    setBoard(Array(length * length).fill(undefined));
    setActivePlayer("X");
    setIsLoading(false);
  };

  const makeGameMove = (index: number) => {
    // Cell already occupied
    if (board[index] !== undefined) return;

    const newBoard = [...board];
    newBoard[index] = activePlayer;
    setBoard(newBoard);
    setActivePlayer(activePlayer === "X" ? "O" : "X");
  };

  return (
    <GameSessionContext.Provider
      value={{
        board,
        boardLength,
        activePlayer,
        isLoading,
        startNewGame,
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
