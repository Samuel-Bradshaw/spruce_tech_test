import React, { FC, useState } from "react";
import { BoardState, XorO } from "../types";
import { getNextPlayer } from "./utils";

/** 3x3 board size */
const BOARD_SIZE = 5;
const FIRST_PLAYER: XorO = "X";

export const Board: FC = () => {
	const [board, setBoard] = useState<BoardState>(
		// Don't need to create a new array every single render
		() => new Array(BOARD_SIZE * BOARD_SIZE).fill(undefined)
	);
	const nextPlayer = getNextPlayer(board, FIRST_PLAYER);

	return (
		<div
			className="grid gap-1"
			style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
		>
			{board.map((cell, index) => (
				<div
					onClick={() => setBoard(
						(prevBoard) => {
							const newBoard = [...prevBoard];
							newBoard[index] = nextPlayer;
							return newBoard;
						}
					)}
					key={index}
					className="border-2 border-gray-900 w-10 h-10 cursor-pointer flex items-center justify-center text-2xl font-bold"
				>
					{cell}
				</div>
			))}
		</div>
	);


}