import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { forwardRef, useState } from "react";
import type { Player } from "../../players/types";
import type { GameSettings, XorO } from "../types";
import { PlayerSelect } from "./PlayerSelect";

type NewGameDialogProps = {
	onConfirm: (gameSettings: GameSettings) => void;
	onCancel: () => void;
	prevSettings: GameSettings;
	players: Player[];
};

export const NewGameDialog = forwardRef<HTMLDialogElement, NewGameDialogProps>(
	({ onConfirm, onCancel, prevSettings, players }, ref) => {
		const [firstPlayer, setFirstPlayer] = useState<XorO>(
			prevSettings.firstPlayer,
		);
		const [boardSize, setBoardSize] = useState(() =>
			Math.min(15, Math.max(0, prevSettings.boardSize)),
		);
		const [playerXId, setPlayerXId] = useState<string>(prevSettings.xPlayer.id);
		const [playerOId, setPlayerOId] = useState<string>(prevSettings.oPlayer.id);

		const handleConfirm = () => {
			const xPlayer =
				players.find((p) => p.id === playerXId) ?? prevSettings.xPlayer;
			const oPlayer =
				players.find((p) => p.id === playerOId) ?? prevSettings.oPlayer;
			onConfirm({
				firstPlayer,
				boardSize,
				xPlayer,
				oPlayer,
			});
		};

		const swapPlayers = () => {
			const tempX = playerXId;
			setPlayerXId(playerOId);
			setPlayerOId(tempX);
		};

		return (
			<dialog
				ref={ref}
				className="p-6 rounded-lg shadow-xl backdrop:bg-black/50 w-[500px] max-w-[90vw]"
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleConfirm();
					}}
				>
					<h2 className="text-lg font-bold text-gray-800 mb-4">New Game</h2>

					<div className="flex justify-between gap-6 mb-4">
						<div className="w-48">
							<label
								htmlFor="board-size"
								className="block text-gray-700 font-medium mb-2"
							>
								Board Size: {boardSize}x{boardSize}
							</label>
							<input
								id="board-size"
								type="range"
								min={3}
								max={15}
								value={boardSize}
								onChange={(e) => setBoardSize(Number(e.target.value))}
								className="w-full"
							/>
							<div className="flex justify-between text-sm text-gray-500">
								<span>3</span>
								<span>15</span>
							</div>
						</div>

						<fieldset>
							<legend className="block text-gray-700 font-medium mb-2">
								First Player
							</legend>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => setFirstPlayer("X")}
									className={`px-4 py-2 font-medium rounded transition-colors ${
										firstPlayer === "X"
											? "bg-gray-800 text-white"
											: "bg-gray-100 text-gray-600 hover:bg-gray-200"
									}`}
								>
									X
								</button>
								<button
									type="button"
									onClick={() => setFirstPlayer("O")}
									className={`px-4 py-2 font-medium rounded transition-colors ${
										firstPlayer === "O"
											? "bg-gray-800 text-white"
											: "bg-gray-100 text-gray-600 hover:bg-gray-200"
									}`}
								>
									O
								</button>
							</div>
						</fieldset>
					</div>

					<div className="mb-6">
						<p className="block text-gray-700 font-medium mb-2">
							Assign Players
						</p>
						<div className="flex items-center gap-3">
							<div className="flex-1">
								<PlayerSelect
									label="X"
									players={players}
									selectedPlayerId={playerXId}
									onSelect={setPlayerXId}
									excludePlayerId={playerOId}
									labelPosition="left"
								/>
							</div>
							<button
								type="button"
								onClick={swapPlayers}
								className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
								title="Swap players"
							>
								<ArrowsRightLeftIcon className="w-5 h-5" />
							</button>
							<div className="flex-1">
								<PlayerSelect
									label="O"
									players={players}
									selectedPlayerId={playerOId}
									onSelect={setPlayerOId}
									excludePlayerId={playerXId}
									labelPosition="right"
								/>
							</div>
						</div>
					</div>

					<div className="flex gap-3 justify-end">
						<button
							type="button"
							onClick={(e) => {
								// JSDom can't handle default "submit" in unit tests
								e.preventDefault();
								onCancel();
							}}
							className="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-100 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
						>
							Start Game
						</button>
					</div>
				</form>
			</dialog>
		);
	},
);
