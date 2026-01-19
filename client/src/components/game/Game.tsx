import { type FC, useEffect } from "react";
import { Board } from "./Board";
import { DRAW, type GameResult, type GameSettings, type XorO } from "./types";
import { useTicTacToe } from "./useTicTacToe";

type GameProps = {
	/**
	 * Settings for the TicTacToe game.
	 */
	gameSettings: GameSettings;
	/**
	 * To be called when the game is over.
	 * The winning player is passed in,
	 * or `null` in the case of a draw.
	 */
	onGameOver?: (result: GameResult) => void;
};

export const Game: FC<GameProps> = ({ gameSettings, onGameOver }) => {
	const { board, setCell, nextPlayer, gameResult, winningLine } =
		useTicTacToe(gameSettings);

	useEffect(() => {
		if (gameResult) {
			onGameOver?.(gameResult);
		}
	}, [gameResult, onGameOver]);

	const getPlayerLabel = (marker: XorO): string => {
		const player = marker === "X" ? gameSettings.xPlayer : gameSettings.oPlayer;
		return `${player.name} (${marker})`;
	};

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
					Next player: <b>{getPlayerLabel(nextPlayer)}</b>
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
					Winner: {getPlayerLabel(gameResult)}
				</p>
			)}
		</div>
	);
};
