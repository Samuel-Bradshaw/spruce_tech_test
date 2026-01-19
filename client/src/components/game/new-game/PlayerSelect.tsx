import type { FC } from "react";
import type { Player } from "../../players/types";

type PlayerSelectProps = {
	label: string;
	players: Player[];
	selectedPlayerId: string;
	onSelect: (playerId: string) => void;
	excludePlayerId?: string;
	labelPosition?: "left" | "right";
};

export const PlayerSelect: FC<PlayerSelectProps> = ({
	label,
	players,
	selectedPlayerId,
	onSelect,
	excludePlayerId,
	labelPosition,
}) => {
	const availablePlayers = players.filter((p) => p.id !== excludePlayerId);

	const labelElement = (
		<span className="text-gray-700 font-bold text-lg">{label}</span>
	);

	return (
		<div className="flex items-center gap-2">
			{labelPosition === "left" && labelElement}
			<select
				value={selectedPlayerId}
				onChange={(e) => onSelect(e.target.value)}
				className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
			>
				{availablePlayers.map((player) => (
					<option key={player.id} value={player.id}>
						{player.name}
					</option>
				))}
			</select>
			{labelPosition === "right" && labelElement}
		</div>
	);
};
