// GET /api/v1/stats
export type GetStatsResponse = {
	xWins: number;
	oWins: number;
	draws: number;
	topPlayer: TopPlayer | null;
};

export type TopPlayer = {
	name: string;
	wins: number;
};
