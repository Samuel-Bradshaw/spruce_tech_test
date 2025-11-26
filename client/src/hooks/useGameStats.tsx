import { useEffect, useState } from "react";
import z from "zod";
import { fetchGameStats } from "../services/hono-client";
import { GameStats } from "../types";

type UseGameStatsReturn = {
  stats: GameStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useGameStats(): UseGameStatsReturn {
  const [stats, setStats] = useState<GameStats>({
    totalGames: 0,
    playerXWins: 0,
    playerOWins: 0,
    totalDraws: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUpdatedStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const stats = await fetchGameStats();
      setStats(stats);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("Invalid stats data received from server");
      }
      console.error("Error fetching game stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUpdatedStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: getUpdatedStats,
  };
}
