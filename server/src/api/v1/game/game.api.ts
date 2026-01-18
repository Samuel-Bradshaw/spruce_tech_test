import type { GameData } from "../types";

// POST /api/v1/game
export type CreateGameRequest = Omit<GameData, "createdAt">;
export type CreateGameResponse = GameData;

// GET /api/v1/game/:id
export type GetGameResponse = GameData;

// GET /api/v1/game
export type GetAllGamesResponse = {
	games: GameData[];
};
