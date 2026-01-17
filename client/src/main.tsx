import { type FC, useState } from "react";
import { v4 as uuid } from "uuid";
import { Board } from "./components/game/Board";
import { NewGameButton } from "./components/game/NewGameButton";

export const Main: FC = () => {
	const [gameId, setGameId] = useState<string>(uuid());
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Tic Tac Toe</h1>
			<NewGameButton onReset={() => setGameId(uuid())} />
			<Board
				/**
				 * Changing the key will render an entirely fresh instance of Board.
				 *
				 * The alternative would be "reset" logic in the useTicTacToe hook
				 * to reset state, which currently is probably quite simple,
				 * but if changes start getting made then there's a risk of the
				 * reset code getting out-of-sync with any new game code.
				 */
				key={gameId}
			/>
		</div>
	);
};
