import React, { useState, useMemo, useCallback } from "react";
import { CellState, XorO } from "./types";
import { WinnerModal } from "./components/WinnerModal";
import { getIfWinner } from "./helpers/winning-conditions-helpers";

export const BOARD_LENGTH = 3;

export const Main = () => {
  const [board, setBoard] = useState<CellState[]>(Array(9).fill(undefined));
  const [activePlayer, setActivePlayer] = useState<XorO>("X");

  const winner = useMemo(() => getIfWinner(board), [board]);

  const togglePlayer = useCallback(() => {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  }, []);

  return (
    <>
      {winner && <WinnerModal winner={winner} />}
      <div className="flex flex-col mt-10 items-center gap-10">
        <div className="font-bold text-2xl">Tic Tac Toe</div>
        <div className="grid grid-cols-3 gap-1">
          {board.map((cell, idx) => (
            <GameCellMemo
              key={idx}
              cellState={cell}
              cellIndex={idx}
              setBoard={setBoard}
              activePlayer={activePlayer}
              togglePlayer={togglePlayer}
            />
          ))}
        </div>
      </div>
    </>
  );
};

type GameCellProps = {
  cellState: CellState;
  cellIndex: number;
  setBoard: React.Dispatch<React.SetStateAction<CellState[]>>;
  activePlayer: XorO;
  togglePlayer: () => void;
};

const GameCellMemo = React.memo(GameCell);
function GameCell({
  cellState,
  cellIndex,
  setBoard,
  activePlayer,
  togglePlayer,
}: GameCellProps): React.JSX.Element {
  const handleClick = () => {
    setBoard((prev) => {
      const isCellOccupied = !!prev[cellIndex];
      if (isCellOccupied) {
        return prev;
      }
      const newBoard = [...prev];
      newBoard[cellIndex] = activePlayer;
      togglePlayer();
      return newBoard;
    });
  };

  return (
    <div
      className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
      data-testid={`cell-${cellIndex}`}
      onClick={handleClick}
    >
      {cellState}
    </div>
  );
}
