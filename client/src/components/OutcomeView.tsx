import React from "react";
import { GameResult, XorO } from "../types";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";

type OutcomeViewProps = {
  outcome: GameResult;
  resetBoard: () => void;
};

export function OutcomeView({
  outcome,
  resetBoard,
}: OutcomeViewProps): React.JSX.Element {
  if (outcome == "TIE") {
    return (
      <Modal>
        <DrawMessage />
        <Button onClick={resetBoard}> Play Again</Button>
      </Modal>
    );
  }

  return (
    <Modal>
      <PlayerWinMessage winner={outcome} />
      <Button onClick={resetBoard}> Play Again</Button>
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
