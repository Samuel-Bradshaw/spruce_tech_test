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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-background-secondary rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-border-primary">
        <div className="flex flex-col items-center gap-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-bold text-white text-center">
            Player {winner} wins!
          </h2>
          <p className="text-border-light text-center">
            Congratulations on your victory!
          </p>
          <button
            onClick={resetBoard}
            className="mt-4 px-8 py-3 bg-accent-sage hover:bg-border-light active:bg-accent-hover text-background-dark font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
