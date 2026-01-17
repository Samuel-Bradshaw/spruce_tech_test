import React from 'react'
import { Board } from './board/Board'

export const Main = () => {
	return (
		<div className='flex flex-col mt-10 items-center gap-10'>
			<div className='font-bold text-2xl'>Tic Tac Toe</div>
			<Board onGameOver={() => {}} firstPlayer="X" boardSize={3} />
		</div>
	);
}
