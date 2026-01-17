import React, { FC, useEffect } from "react";
import { DRAW, GameResult, XorO } from "./types";
import { useTicTacToe } from "./useTicTacToe";

type BoardProps = {
	/**
	 * A number between 3 and 15.
	 * @default 3
	 */
	boardSize?: number;

	/**
	 * Player that goes first in the game.
	 * @default "X"
	 */
	firstPlayer?: XorO;

	/**
	 * To be called when the game is over.
	 * The winning player is passed in,
	 * or `null` in the case of a draw.
	 */
	onGameOver?: (winner: GameResult) => void;
}

export const Board: FC<BoardProps> = ({
	boardSize = 3,
	firstPlayer = "X",
	onGameOver,
}) => {
	const {
		board,
		setCell,
		nextPlayer,
		gameResult,
	} = useTicTacToe(boardSize, firstPlayer);

	useEffect(
		() => {
			if(gameResult) {
				onGameOver?.(gameResult)
			}
		},
		[gameResult]
	);

	return (
		<div className="flex flex-col items-center gap-6">
			<div
				className="grid bg-gray-300 p-1 rounded"
				style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)`, gap: '4px' }}
			>
				{board.map((cell, index) => (
					<div
						onClick={() => {
							if(cell !== undefined || gameResult) return;
							setCell(index, nextPlayer)
						}}
						key={index}
						className="bg-white w-16 h-16 flex items-center justify-center text-3xl font-bold cursor-pointer hover:bg-gray-100 transition-colors select-none"
					>
						{cell}
					</div>
				))}
			</div>
			{gameResult === DRAW && <p className="text-lg font-semibold text-gray-600">Draw!</p>}
			{gameResult && gameResult !== DRAW && <p className="text-lg font-semibold text-gray-800">Winner: {gameResult}</p>}
		</div>
	);


}