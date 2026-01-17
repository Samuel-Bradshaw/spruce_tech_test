import React, { FC, useState } from 'react'
import { Board } from './game/Board'
import { v4 as uuid } from "uuid"

export const Main: FC = () => {
	const [gameId, setGameId] = useState<string>(uuid())
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Tic Tac Toe</h1>
			<button
				onClick={() => setGameId(uuid())}
				className="mb-6 px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
			>
				New Game
			</button>
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
}
