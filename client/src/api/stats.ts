import { api } from "./index";
import { GameStats } from "../types";

// GET current scores
export const getStats = async (): Promise<GameStats> => {
  const { data } = await api.get<GameStats>("/stats");
  return data;
};

// POST result to add to the score
export const postResult = async (
  result: "X" | "O" | "draw"
): Promise<GameStats> => {
  const { data } = await api.post<GameStats>("/result", { result });
  return data;
};

// POST stats to reset scores
export const resetStats = async (): Promise<void> => {
  await api.delete("/stats");
};
