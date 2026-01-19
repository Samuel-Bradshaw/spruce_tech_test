import { type FC, useRef, useState } from "react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import type { Player } from "./types";
import { ANONYMOUS_NAME } from "./usePlayerStorage";

type PlayerManagerProps = {
	players: Player[];
	activePlayerIds: string[];
	onAddPlayer: (name: string) => void;
	onRemovePlayer: (id: string) => void;
};

export const PlayerManager: FC<PlayerManagerProps> = ({
	players,
	activePlayerIds,
	onAddPlayer,
	onRemovePlayer,
}) => {
	const [newPlayerName, setNewPlayerName] = useState("");
	const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleAdd = () => {
		if (newPlayerName.trim()) {
			onAddPlayer(newPlayerName.trim());
			setNewPlayerName("");
		}
	};

	const openDeleteDialog = (player: Player) => {
		setPlayerToDelete(player);
		dialogRef.current?.showModal();
	};

	const closeDeleteDialog = () => {
		dialogRef.current?.close();
		setPlayerToDelete(null);
	};

	const handleConfirmDelete = () => {
		if (playerToDelete) {
			onRemovePlayer(playerToDelete.id);
		}
		closeDeleteDialog();
	};

	return (
		<div className="border border-gray-200 rounded p-4 bg-white">
			<h2 className="text-gray-700 font-medium mb-3">Players</h2>

			<div className="flex gap-2 mb-3">
				<input
					type="text"
					value={newPlayerName}
					onChange={(e) => setNewPlayerName(e.target.value)}
					placeholder="New player name"
					className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					}}
				/>
				<button
					type="button"
					onClick={handleAdd}
					disabled={!newPlayerName.trim()}
					className="px-3 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
				>
					Add
				</button>
			</div>

			<ul className="space-y-2">
				{players.map((player) => (
					<li
						key={player.id}
						className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded"
					>
						<span className="text-sm">{player.name}</span>
						{player.name !== ANONYMOUS_NAME && (
							<button
								type="button"
								onClick={() => openDeleteDialog(player)}
								className="text-red-600 hover:text-red-800 font-medium text-xs"
							>
								Delete
							</button>
						)}
					</li>
				))}
			</ul>

			<ConfirmDeleteDialog
				ref={dialogRef}
				playerName={playerToDelete?.name ?? ""}
				isActivePlayer={
					playerToDelete ? activePlayerIds.includes(playerToDelete.id) : false
				}
				onConfirm={handleConfirmDelete}
				onCancel={closeDeleteDialog}
			/>
		</div>
	);
};
