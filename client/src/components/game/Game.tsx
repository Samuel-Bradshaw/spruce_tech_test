import { type FC, useEffect } from "react";
import { Board } from "./Board";
import { DRAW, type GameResult, type GameSettings } from "./types";
import { useTicTacToe } from "./useTicTacToe";

type GameProps = {
	/**
	 * Settings for the TicTacToe game.
	 * @default { boardSize:3, firstPlayer:"X" }
	 */
	gameSettings?: GameSettings;
	/**
	 * To be called when the game is over.
	 * The winning player is passed in,
	 * or `null` in the case of a draw.
	 */
	onGameOver?: (winner: GameResult) => void;
};

export const Game: FC<GameProps> = ({
	gameSettings = {
		firstPlayer: "X",
		boardSize: 3,
	},
	onGameOver,
}) => {
	const { board, setCell, nextPlayer, gameResult, winningLine } =
		useTicTacToe(gameSettings);

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
				<p
					className="text-lg font-semibold text-gray-600"
					data-testid="game-status"
				>
					Next player: <b>{nextPlayer}</b>
				</p>
			)}
			{gameResult === DRAW && (
				<p
					className="text-lg font-semibold text-gray-600"
					data-testid="game-status"
				>
					Draw!
				</p>
			)}
			{gameResult && gameResult !== DRAW && (
				<p
					className="text-lg font-semibold text-gray-800"
					data-testid="game-status"
				>
					Winner: {gameResult}
				</p>
			)}
		</div>
	);
};
