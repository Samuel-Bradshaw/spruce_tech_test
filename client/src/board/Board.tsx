import React, { FC, useEffect, useMemo, useState } from "react";
import { BoardState, XorO } from "../types";
import { getNextPlayer, getWinner, getWinningLines, isBoardFilled } from "./utils";

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
	onGameOver: (winner: XorO | null) => void;
}

export const Board: FC<BoardProps> = ({
	boardSize,
	firstPlayer,
	onGameOver,
}) => {
	const [board, setBoard] = useState<BoardState>(
		// Don't need to create a new array every single render
		() => new Array(boardSize * boardSize).fill(undefined)
	);
	const nextPlayer = getNextPlayer(board, firstPlayer);

	const winningLines = useMemo(
		() => getWinningLines(boardSize),
		[boardSize]
	);

	const winner = getWinner(board, winningLines);
	const gameover = !!winner || isBoardFilled(board);

	useEffect(
		() => {
			if(gameover) {
				onGameOver(winner)
			}
		},
		[gameover]
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
							if(gameover) return;
							setBoard(
								(prevBoard) => {
									const newBoard = [...prevBoard];
									newBoard[index] = nextPlayer;
									return newBoard;
								}
							)
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