import { type FC, useState } from "react";
import { v4 as uuid } from "uuid";
import { Game } from "./components/game/Game";
import { NewGameButton } from "./components/game/new-game/NewGameButton";
import type { GameSettings } from "./components/game/types";
import { PlayerManager } from "./components/players/PlayerManager";
import { usePlayerStorage } from "./components/players/usePlayerStorage";

type GameInfo = GameSettings & {
	id: string;
};

export const Main: FC = () => {
	const [gameInfo, setGameId] = useState<GameInfo>(() => ({
		// Or could come from a DB, for example
		id: uuid(),
		boardSize: 3,
		firstPlayer: "X",
	}));

	const { players, addPlayer, removePlayer } = usePlayerStorage();

	const createNewGame = (gameSettings: GameSettings) => {
		setGameId({
			...gameSettings,
			id: uuid(),
		});
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
				<div className="absolute left-4 top-0 w-80">
					<PlayerManager
						players={players}
						onAddPlayer={addPlayer}
						onRemovePlayer={removePlayer}
					/>
				</div>
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
				/>
			</div>
		</div>
	);
};
