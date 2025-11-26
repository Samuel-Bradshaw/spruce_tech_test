import React from "react";
import { Button } from "./ui/Button";
import { useGameStats } from "../hooks/useGameStats";
import { GameStats } from "src/types";

export function OutcomeHistory(): React.JSX.Element {
  const { stats, isLoading, error, refetch } = useGameStats();

  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <p className="text-border-light">Loading game statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="text-status-error mb-4">{error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  if (!stats) {
    return <></>;
  }

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Game Statistics
      </h2>
      <ScoreDisplay
        totalDraws={stats.totalDraws}
        playerOWins={stats.playerOWins}
        playerXWins={stats.playerXWins}
        totalGames={stats.totalGames}
      />
      <div className="text-center mt-4">
        <Button onClick={refetch}>Refresh Stats</Button>
      </div>
    </div>
  );
}

function ScoreDisplay(stats: GameStats) {
  return (
    <div className="bg-background-secondary rounded-lg shadow-xl p-6 space-y-4 border-2 border-border-primary">
      <div className="flex justify-between items-center border-b border-border-primary pb-3">
        <span className="font-semibold text-border-light">Total Games:</span>
        <span className="text-xl font-bold text-white">{stats.totalGames}</span>
      </div>
      <div className="flex justify-between items-center border-b border-border-primary pb-3">
        <span className="font-semibold text-accent-sage">Player X Wins:</span>
        <span className="text-xl font-bold text-accent-sage">
          {stats.playerXWins}
        </span>
      </div>
      <div className="flex justify-between items-center border-b border-border-primary pb-3">
        <span className="font-semibold text-accent-hover">Player O Wins:</span>
        <span className="text-xl font-bold text-accent-hover">
          {stats.playerOWins}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-border-light">Draws:</span>
        <span className="text-xl font-bold text-text-secondary">
          {stats.totalDraws}
        </span>
      </div>
    </div>
  );
}
