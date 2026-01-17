import { type FC, useEffect } from "react";
import { Board } from "./Board";
import { DRAW, type GameResult, type XorO } from "./types";
import { useTicTacToe } from "./useTicTacToe";

type GameProps = {
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
};

export const Game: FC<GameProps> = ({
	boardSize = 3,
	firstPlayer = "X",
	onGameOver,
}) => {
	const { board, setCell, nextPlayer, gameResult, winningLine } = useTicTacToe(
		boardSize,
		firstPlayer,
	);

	useEffect(() => {
		if (gameResult) {
			onGameOver?.(gameResult);
		}
	}, [gameResult, onGameOver]);

	return (
		<div className="flex flex-col items-center gap-6">
			<Board
				board={board}
				disabled={!!gameResult}
				winningLine={winningLine}
				onCellClick={(index) => setCell(index, nextPlayer)}
			/>
			{!gameResult && (
				<p className="text-lg font-semibold text-gray-600">
					Next player: <b>{nextPlayer}</b>
				</p>
			)}
			{gameResult === DRAW && (
				<p className="text-lg font-semibold text-gray-600">Draw!</p>
			)}
			{gameResult && gameResult !== DRAW && (
				<p className="text-lg font-semibold text-gray-800">
					Winner: {gameResult}
				</p>
			)}
		</div>
	);
};
