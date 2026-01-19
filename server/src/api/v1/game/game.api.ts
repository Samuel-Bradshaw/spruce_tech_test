import type { GameData } from "../types";

// POST /api/v1/game
// When creating a game, user IDs are required (they become nullable only after user deletion)
export type CreateGameRequest = Omit<
	GameData,
	"createdAt" | "userXId" | "userOId"
> & {
	userXId: string;
	userOId: string;
};
export type CreateGameResponse = GameData;

// GET /api/v1/game/:id
export type GetGameResponse = GameData;

// GET /api/v1/game
export type GetAllGamesResponse = {
	games: GameData[];
};
