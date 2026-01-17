import React, { FC, useRef } from "react";
import { ConfirmDialog } from "../ConfirmDialog";

type NewGameButtonProps = {
	onReset: () => void;
};

export const NewGameButton: FC<NewGameButtonProps> = ({ onReset }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	return (
		<>
			<button
				onClick={() => dialogRef.current?.showModal()}
				className="mb-6 px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
			>
				New Game
			</button>
			<ConfirmDialog
				ref={dialogRef}
				title="New Game"
				message="Are you sure you want to start a new game?"
				onConfirm={onReset}
			/>
		</>
	);
};
