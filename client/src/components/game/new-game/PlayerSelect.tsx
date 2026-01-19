import type { FC } from "react";
import type { Player } from "../../players/types";
import { ANONYMOUS_NAME } from "../../players/usePlayerStorage";

type PlayerSelectProps = {
	label: string;
	players: Player[];
	selectedPlayerId: string | null;
	onSelect: (playerId: string | null) => void;
	excludePlayerId?: string | null;
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
	const anonymousPlayer = players.find((p) => p.name === ANONYMOUS_NAME);
	const defaultPlayerId = anonymousPlayer?.id ?? "";

	const labelElement = (
		<span className="text-gray-700 font-bold text-lg">{label}</span>
	);

	return (
		<div className="flex items-center gap-2">
			{labelPosition === "left" && labelElement}
			<select
				value={selectedPlayerId ?? defaultPlayerId}
				onChange={(e) => onSelect(e.target.value || null)}
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
