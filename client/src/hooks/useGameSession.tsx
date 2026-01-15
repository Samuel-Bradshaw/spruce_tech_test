import { useContext } from "react";
import { GameSession, GameSessionContext } from "../providers/game-session";

export const useGameSession = (): GameSession => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error("useGameSession must be used within a GameSessionProvider");
  }
  return context;
};
