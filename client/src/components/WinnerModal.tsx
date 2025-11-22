import React from "react";
import { XorO } from "../types";

type WinnerModalProps = {
  winner: XorO;
  resetBoard: () => void;
};

export function WinnerModal({
  winner,
  resetBoard,
}: WinnerModalProps): React.JSX.Element {
  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="text-xl">Player {winner} wins!</div>
      <button onClick={resetBoard}>Reset game!</button>
    </div>
  );
}
