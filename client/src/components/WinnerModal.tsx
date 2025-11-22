import React from "react";
import { XorO } from "../types";

type WinnerModalProps = {
  winner: XorO;
};

export function WinnerModal({ winner }: WinnerModalProps): React.JSX.Element {
  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="text-xl">Player {winner} wins!</div>
    </div>
  );
}
