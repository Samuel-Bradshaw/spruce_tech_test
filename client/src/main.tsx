import { type FC, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDeleteUser } from "./api/useDeleteUser";
import { useSaveGameResult } from "./api/useSaveGameResult";
import { Game } from "./components/game/Game";
import { NewGameButton } from "./components/game/new-game/NewGameButton";
import type { GameResult, GameSettings } from "./components/game/types";
import { PendingOverlay } from "./components/PendingOverlay";
import { PlayerManager } from "./components/players/PlayerManager";
import { Stats } from "./components/stats/Stats";
import {
	ANONYMOUS_NAME,
	usePlayerStorage,
} from "./components/players/usePlayerStorage";

export const Main: FC = () => {
	const { players, addPlayer, removePlayer } = usePlayerStorage();
	const {
		mutate: saveGameResult,
		isPending: isSaving,
		error: saveError,
		reset: resetSaveError,
	} = useSaveGameResult();

	const {
		mutate: deleteUserOnServer,
		isPending: isDeleting,
		error: deleteError,
		reset: resetDeleteError,
	} = useDeleteUser();

	const getDefaultPlayers = useCallback(() => {
		const anonymousPlayer = players.find((p) => p.name === ANONYMOUS_NAME);
		const otherPlayers = players.filter((p) => p.name !== ANONYMOUS_NAME);

		return {
			xPlayer: otherPlayers[0] ?? anonymousPlayer,
			oPlayer: otherPlayers[1] ?? anonymousPlayer,
		} as const;
	}, [players]);

	const [gameSettings, setGameSettings] = useState<GameSettings>(() => {
		const { xPlayer, oPlayer } = getDefaultPlayers();
		return {
			// Or could come from a DB, for example
			id: uuid(),
			boardSize: 3,
			firstPlayer: "X",
			xPlayer,
			oPlayer,
		};
	});

	const createNewGame = (gameSettings: GameSettings) => {
		setGameSettings({
			...gameSettings,
			id: uuid(),
		});
	};

	const activePlayerIds = [gameSettings.xPlayer.id, gameSettings.oPlayer.id];

	const handleRemovePlayer = (id: string) => {
		deleteUserOnServer(id, {
			onSuccess: () => {
				removePlayer(id);
				if (activePlayerIds.includes(id)) {
					const remainingPlayers = players.filter((p) => p.id !== id);
					const anonymousPlayer = remainingPlayers.find(
						(p) => p.name === ANONYMOUS_NAME,
					);
					const otherPlayers = remainingPlayers.filter(
						(p) => p.name !== ANONYMOUS_NAME,
					);
					const fallback = anonymousPlayer ?? remainingPlayers[0];
					setGameSettings({
						id: uuid(),
						boardSize: gameSettings.boardSize,
						firstPlayer: "X",
						xPlayer: otherPlayers[0] ?? fallback,
						oPlayer: otherPlayers[1] ?? fallback,
					});
				}
			},
		});
	};

	const onGameover = useCallback(
		(result: GameResult) => {
			saveGameResult({
				...gameSettings,
				result,
			});
		},
		[gameSettings, saveGameResult],
	);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Tic Tac Toe</h1>
			<PendingOverlay
				isPending={isSaving || isDeleting}
				error={saveError ?? deleteError}
				onDismissError={saveError ? resetSaveError : resetDeleteError}
			/>
			<NewGameButton
				onNewGame={createNewGame}
				prevSettings={gameSettings}
				players={players}
			/>
			<div className="relative w-full flex justify-center">
				<Game
					/**
					 * Changing the key will render an entirely fresh instance of Board.
					 *
					 * The alternative would be "reset" logic in the useTicTacToe hook
					 * to reset state, which currently is probably quite simple,
					 * but if changes start getting made then there's a risk of the
					 * reset code getting out-of-sync with any new game code.
					 */
					key={gameSettings.id}
					gameSettings={gameSettings}
					onGameOver={onGameover}
				/>
				<div className="absolute left-4 top-0 w-80">
					<PlayerManager
						players={players}
						activePlayerIds={activePlayerIds}
						onAddPlayer={addPlayer}
						onRemovePlayer={handleRemovePlayer}
					/>
				</div>
				<div className="absolute right-4 top-0">
					<Stats />
				</div>
			</div>
		</div>
	);
};
