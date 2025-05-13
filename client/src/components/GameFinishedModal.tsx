import React, { useEffect, useLayoutEffect, useRef } from "react";
import { BoardState, XorO } from "../types";
import confetti from "canvas-confetti";
import { postResult } from "../api/stats";

type GameFinishedModalProps = {
  boardState: BoardState;
  onClose: () => void;
};

const GameFinishedModal: React.FC<GameFinishedModalProps> = ({
  boardState,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    console.log(cardRef.current);
    if (!cardRef.current || boardState === BoardState.Draw) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 150,
      startVelocity: 40,
      spread: 80,
      origin: { x, y },
      scalar: 0.9,
      zIndex: 1000,
    });
  }, []);

  let title;
  if (boardState === BoardState.Draw) {
    title = "Game was a draw!";
  } else if (boardState === BoardState.OWin || boardState === BoardState.XWin) {
    const winner: XorO = boardState === BoardState.OWin ? "O" : "X";
    title = `Player ${winner} Wins!`;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl"
        ref={cardRef}
      >
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <p className="mb-6">
          Click Ok to view the board. Hit the reset button on the main page to
          start a new game.
        </p>
        <button
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          onClick={onClose}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default GameFinishedModal;
