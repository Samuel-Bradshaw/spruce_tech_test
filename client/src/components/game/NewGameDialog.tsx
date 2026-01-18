import { forwardRef, useState } from "react";
import type { GameSettings, XorO } from "./types";

type ConfirmDialogProps = {
	onConfirm: (gameSettings: GameSettings) => void;
	prevSettings: GameSettings;
};

export const NewGameDialog = forwardRef<HTMLDialogElement, ConfirmDialogProps>(
	({ onConfirm, prevSettings }, ref) => {
		const [firstPlayer, setFirstPlayer] = useState<XorO>(
			prevSettings.firstPlayer,
		);
		const [boardSize, setBoardSize] = useState(() =>
			Math.min(15, Math.max(0, prevSettings.boardSize)),
		);

		const handleConfirm = () => {
			onConfirm({ firstPlayer, boardSize });
		};

		return (
			<dialog
				ref={ref}
				className="p-6 rounded-lg shadow-xl backdrop:bg-black/50"
			>
				<form method="dialog">
					<h2 className="text-lg font-bold text-gray-800 mb-4">New Game</h2>

					<fieldset className="mb-4">
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

					<div className="mb-6">
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

					<div className="flex gap-3 justify-end">
						<button
							type="submit"
							className="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-100 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							onClick={handleConfirm}
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
