import React from "react";
import { OutcomeView } from "./components/OutcomeView";
import { GameBoard } from "./components/game/GameBoard";
import { UserInput } from "./components/UserInput";
import { OutcomeHistory } from "./components/OutcomeHistory";
import { GameSessionProvider } from "./providers/game-session";

export const Main = () => {
  return (
    <>
      <GameSessionProvider>
        <UserInput />
        <GameBoard />
        <OutcomeView />
      </GameSessionProvider>
      <OutcomeHistory />
    </>
  );
};
