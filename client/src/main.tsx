import React from 'react'
import { Board } from './board/Board'

export const Main = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Tic Tac Toe</h1>
			<Board onGameOver={() => {}} firstPlayer="X" boardSize={3} />
		</div>
	);
}
