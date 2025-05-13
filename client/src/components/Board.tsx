import React from "react";
import { BoardGrid, BoardState, XorO } from "../types";
import Cell from "./Cell";

type BoardProps = {
  board: BoardGrid;
  setBoard: (BoardGrid) => void;
  currentPlayer: XorO;
  setCurrentPlayer: (value: XorO) => void;
  boardState: BoardState;
};

const Board: React.FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  boardState,
}) => {
  const onCellClick = (coords: [number, number]): void => {
    const [i, j] = coords;
    const cellVal = board[j][i];
    if (cellVal != undefined || boardState !== BoardState.InProgress) return;
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[j][i] = currentPlayer;
      return newBoard;
    });

    currentPlayer == "O" ? setCurrentPlayer("X") : setCurrentPlayer("O");
  };

  return (
    <div
      className="
      grid gap-1
      bg-gray-900
      aspect-square
      w-fit
      [width:min(80vw,55vh)]
    "
      style={{
        gridTemplateColumns: `repeat(${board.length}, 1fr)`,
      }}
    >
      {board.flatMap((row, j) =>
        row.map((column, i) => (
          <Cell
            key={`${j}-${i}`}
            onCellClick={onCellClick}
            currentPlayer={currentPlayer}
            columnValue={column}
            coords={[i, j]}
            boardState={boardState}
          />
        ))
      )}
    </div>
  );
};

export default Board;
