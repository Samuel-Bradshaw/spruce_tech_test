import React, { FC, useEffect } from "react";
import { GameResult, XorO } from "./types";
import { useTicTacToe } from "./useTicTacToe";

type BoardProps = {
	/**
	 * A number between 3 and 15.
	 */
	boardSize: number;

	firstPlayer: XorO;

	/**
	 * To be called when the game is over.
	 * The winning player is passed in,
	 * or `null` in the case of a draw.
	 */
	onGameOver: (winner: GameResult) => void;
}

export const Board: FC<BoardProps> = ({
	boardSize,
	firstPlayer,
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
				onGameOver(gameResult)
			}
		},
		[gameResult]
	);

	return (
		<div>
			<div
				className="grid gap-1"
				style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
			>
				{board.map((cell, index) => (
					<div
						onClick={() => {
							if(cell !== undefined || gameResult) return;
							setCell(index, nextPlayer)
						}}
						key={index}
						className="border-2 border-gray-900 w-10 h-10 cursor-pointer flex items-center justify-center text-2xl font-bold"
					>
						{cell}
					</div>
				))}
			</div>
		</div>
	);


}