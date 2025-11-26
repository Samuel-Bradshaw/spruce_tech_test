import React from "react";
import { XorO } from "../types";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { useGameSession } from "../hooks/useGameSession";
import { getIfGameOutcome } from "../utils/game-outcome-utils";

export function OutcomeView(): React.JSX.Element {
  const { finishGame, board } = useGameSession();
  const outcome = board && getIfGameOutcome(board);
  if (!outcome) return <></>;

  if (outcome == "TIE") {
    return (
      <Modal>
        <DrawMessage />
        <Button onClick={finishGame}>Play Again</Button>
      </Modal>
    );
  }

  return (
    <Modal>
      <PlayerWinMessage winner={outcome} />
      <Button onClick={finishGame}>Play Again</Button>
    </Modal>
  );
}

function DrawMessage() {
  return (
    <>
      <h2 className="text-3xl font-bold text-white text-center">
        It's a draw!
      </h2>
      <p className="text-border-light text-center">
        Well played! Try again to see who wins.
      </p>
    </>
  );
}

function PlayerWinMessage({ winner }: { winner: XorO }) {
  return (
    <>
      <div className="text-6xl">🎉</div>
      <h2 className="text-3xl font-bold text-white text-center">
        Player "{winner}" wins!
      </h2>
      <p className="text-border-light text-center">
        Congratulations on your victory!
      </p>
    </>
  );
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};
