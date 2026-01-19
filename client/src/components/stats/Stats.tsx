import type { FC } from "react";
import { useStats } from "../../api/useStats";

export const Stats: FC = () => {
	const { data: stats, isLoading, error } = useStats();

	if (isLoading) {
		return (
			<div className="bg-white rounded-lg shadow p-4 w-80">
				<h2 className="text-lg font-bold text-gray-800 mb-4">Game Stats</h2>
				<p className="text-gray-500">Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white rounded-lg shadow p-4 w-80">
				<h2 className="text-lg font-bold text-gray-800 mb-4">Game Stats</h2>
				<p className="text-red-500 text-sm">Failed to load stats</p>
			</div>
		);
	}

	if (!stats) {
		return null;
	}

	const totalGames = stats.xWins + stats.oWins + stats.draws;

	return (
		<div className="bg-white rounded-lg shadow p-4 w-80">
			<h2 className="text-lg font-bold text-gray-800 mb-4">Game Stats</h2>

			{totalGames === 0 ? (
				<p className="text-gray-500 text-sm">No games played yet</p>
			) : (
				<>
					<div className="space-y-2 mb-4">
						<div className="flex justify-between">
							<span className="text-gray-600">X Wins:</span>
							<span className="font-medium text-gray-800">{stats.xWins}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">O Wins:</span>
							<span className="font-medium text-gray-800">{stats.oWins}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Draws:</span>
							<span className="font-medium text-gray-800">{stats.draws}</span>
						</div>
					</div>

					{stats.topPlayer && (
						<div className="border-t pt-3">
							<p className="text-sm text-gray-500 mb-1">Top Player</p>
							<p className="font-medium text-gray-800">
								{stats.topPlayer.name}{" "}
								<span className="text-gray-500 font-normal">
									({stats.topPlayer.wins} win{stats.topPlayer.wins !== 1 && "s"}
									)
								</span>
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};
