import { type FC, useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { Game } from "./components/game/Game";
import { NewGameButton } from "./components/game/new-game/NewGameButton";
import {
	DRAW,
	type GameResult,
	type GameSettings,
} from "./components/game/types";
import { PlayerManager } from "./components/players/PlayerManager";
import {
	ANONYMOUS_NAME,
	usePlayerStorage,
} from "./components/players/usePlayerStorage";

type GameInfo = GameSettings & {
	id: string;
};

export const Main: FC = () => {
	const { players, addPlayer, removePlayer } = usePlayerStorage();

	const getDefaultPlayers = useCallback(() => {
		const anonymousPlayer = players.find((p) => p.name === ANONYMOUS_NAME);
		const otherPlayers = players.filter((p) => p.name !== ANONYMOUS_NAME);

		return {
			xPlayer: otherPlayers[0] ?? anonymousPlayer,
			oPlayer: otherPlayers[1] ?? anonymousPlayer,
		} as const;
	}, [players]);

	const [gameInfo, setGameId] = useState<GameInfo>(() => {
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
		setGameId({
			...gameSettings,
			id: uuid(),
		});
	};

	const activePlayerIds = [gameInfo.xPlayer.id, gameInfo.oPlayer.id];

	const handleRemovePlayer = (id: string) => {
		removePlayer(id);
		// If the deleted player is in the current game, reset with new defaults
		if (activePlayerIds.includes(id)) {
			// Need to compute defaults after removal - filter out the deleted player
			const remainingPlayers = players.filter((p) => p.id !== id);
			const anonymousPlayer = remainingPlayers.find(
				(p) => p.name === ANONYMOUS_NAME,
			);
			const otherPlayers = remainingPlayers.filter(
				(p) => p.name !== ANONYMOUS_NAME,
			);
			// Anonymous player always exists, but fallback to first remaining player for type safety
			const fallback = anonymousPlayer ?? remainingPlayers[0];
			setGameId({
				id: uuid(),
				boardSize: gameInfo.boardSize,
				firstPlayer: "X",
				xPlayer: otherPlayers[0] ?? fallback,
				oPlayer: otherPlayers[1] ?? fallback,
			});
		}
	};

	const onGameover = (result: GameResult) => {
		const winningUser = result === DRAW ? "DRAW" : result;
		console.log("WINNER: ", winningUser);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Tic Tac Toe</h1>
			<NewGameButton
				onNewGame={createNewGame}
				prevSettings={gameInfo}
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
					key={gameInfo.id}
					gameSettings={gameInfo}
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
			</div>
		</div>
	);
};
