import { CellState, GameRound } from "src/types";

export function mockCompletedGame(): GameRound {
  return {
    id: "mock-game-id",
    boardSize: 9,
    winner: "X",
    status: "COMPLETED",
    createdAt: new Date(),
    completedAt: new Date(),
  };
}

export function mockGameMove(): (...args: any) => Promise<CellState[]> {
  return (gameId, player, cellIdx, board) => {
    const newBoard = [...board];
    newBoard[cellIdx] = player;
    return Promise.resolve(newBoard);
  };
}

export function mockNewGame(boardSideLength: number) {
  const boardSize = boardSideLength * boardSideLength;
  const defaultNewGame = {
    id: "mock-game-id",
    boardSideLength,
    boardSize,
    boardState: Array(boardSize).fill(null),
    gameStatus: "IN_PROGRESS",
    winner: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(defaultNewGame);
}
