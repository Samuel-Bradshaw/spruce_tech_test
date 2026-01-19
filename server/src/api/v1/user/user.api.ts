// POST /api/v1/user
export type CreateUserRequest = {
	id: string;
	name: string;
};

export type CreateUserResponse = {
	id: string;
	name: string;
	createdAt: number;
};

// GET /api/v1/user
export type GetAllUsersResponse = {
	users: GetUserResponse[];
};

// GET /api/v1/user/:id
export type GetUserResponse = {
	id: string;
	name: string;
	createdAt: number;
};

// GET /api/v1/user/:id/games
export type GetUserGamesResponse = {
	games: UserGameSummary[];
};

export type UserGameSummary = {
	id: string;
	boardSize: number;
	winner: "X" | "O" | null;
	isDraw: boolean | null;
	playedAs: "X" | "O";
	createdAt: number;
};

// GET /api/v1/user/:id/stats
export type GetUserStatsResponse = {
	wins: number;
	losses: number;
	draws: number;
};

// DELETE /api/v1/user/:id
export type DeleteUserResponse = {
	success: boolean;
};
