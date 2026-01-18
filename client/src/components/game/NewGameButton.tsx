import { type FC, useRef } from "react";
import { NewGameDialog } from "./NewGameDialog";
import type { GameSettings } from "./types";

type NewGameButtonProps = {
	onReset: (gameSettings: GameSettings) => void;
	prevSettings: GameSettings;
};

export const NewGameButton: FC<NewGameButtonProps> = ({
	onReset,
	prevSettings,
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

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
				onConfirm={onReset}
				prevSettings={prevSettings}
			/>
		</>
	);
};
