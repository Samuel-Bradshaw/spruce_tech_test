import { type FC, useRef } from "react";
import { NewGameDialog } from "./NewGameDialog";
import type { GameSettings } from "./types";

type NewGameButtonProps = {
	onNewGame: (gameSettings: GameSettings) => void;
	prevSettings: GameSettings;
};

export const NewGameButton: FC<NewGameButtonProps> = ({
	onNewGame,
	prevSettings,
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const closeDialog = () => {
		dialogRef.current?.close();
	};

	const handleConfirm = (settings: GameSettings) => {
		closeDialog();
		onNewGame(settings);
	};

	return (
		<>
			<button
				type="button"
				onClick={() => dialogRef.current?.showModal()}
				className="mb-6 px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
			>
				New Game
			</button>
			<NewGameDialog
				ref={dialogRef}
				onConfirm={handleConfirm}
				onCancel={closeDialog}
				prevSettings={prevSettings}
			/>
		</>
	);
};
