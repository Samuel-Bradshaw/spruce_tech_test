import React, { FC, useState } from "react";
import { Grid, XorO } from "../types";

/** 3x3 board size */
const BOARD_SIZE = 5;

export const Board: FC = () => {
	const [board, setBoard] = useState<Grid>(
		// Don't need to create a new array every single render
		() => new Array(BOARD_SIZE * BOARD_SIZE).fill(undefined)
	)

	return (
		<div
			className="grid gap-1"
			style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
		>
			{board.map((cell, index) => (
				<div
					key={index}
					className="border-2 border-gray-900 w-10 h-10 cursor-pointer flex items-center justify-center text-2xl font-bold"
				>
					{cell}
				</div>
			))}
		</div>
	);


}