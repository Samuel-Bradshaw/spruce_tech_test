// GET /api/v1/stats
export type GetStatsResponse = {
	X: PlayerStats;
	O: PlayerStats;
	draws: number;
};

export type PlayerStats = {
	wins: number;
	losses: number;
};
