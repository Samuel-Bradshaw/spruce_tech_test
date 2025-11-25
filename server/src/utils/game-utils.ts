import type { GameRound } from "../db/schema.js";
import type { GameStats } from "../rest-schema.js";

export function calculateGameStats(allGames: GameRound[]) {
  const initialStats: GameStats = {
    totalGames: 0,
    playerXWins: 0,
    playerOWins: 0,
    totalDraws: 0,
  };
  const stats = allGames.reduce((acc, game) => {
    if (game.winner === "X") {
      acc.playerXWins += 1;
    } else if (game.winner === "O") {
      acc.playerOWins += 1;
    } else if (game.winner === "TIE") {
      acc.totalDraws += 1;
    }
    acc.totalGames += 1;
    return acc;
  }, initialStats);
  return stats;
}
