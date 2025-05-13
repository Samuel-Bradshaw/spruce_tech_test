import React from "react";
import GameStatsDisplay from "./GameStatsDisplay";
import { getStats, resetStats } from "../api/stats";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const GameStatsDisplayContainer: React.FC = ({}) => {
  const queryClient = useQueryClient();

  const handleResetStats = () => {
    resetStats().then(() => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    });
  };

  const {
    status,
    error,
    data: gameStats,
  } = useQuery({ queryKey: ["stats"], queryFn: getStats });

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  console.log(gameStats);
  return (
    <GameStatsDisplay
      handleResetStats={handleResetStats}
      xwins={gameStats.xwins}
      owins={gameStats.owins}
      draws={gameStats.draws}
    />
  );
};

export default GameStatsDisplayContainer;
