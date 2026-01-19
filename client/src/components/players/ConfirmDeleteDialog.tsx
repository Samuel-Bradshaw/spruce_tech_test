import { forwardRef } from "react";

type ConfirmDeleteDialogProps = {
	playerName: string;
	isActivePlayer: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};

export const ConfirmDeleteDialog = forwardRef<
	HTMLDialogElement,
	ConfirmDeleteDialogProps
>(({ playerName, isActivePlayer, onConfirm, onCancel }, ref) => {
	return (
		<dialog
			ref={ref}
			className="p-6 rounded-lg shadow-xl backdrop:bg-black/50 w-[320px] max-w-[90vw]"
		>
			<h2 className="text-lg font-bold text-gray-800 mb-2">Delete Player</h2>
			<p className="text-gray-600 mb-2">
				Are you sure you want to delete <strong>{playerName}</strong>?
			</p>
			{isActivePlayer && (
				<p className="text-amber-600 text-sm mb-4">
					This player is in the current game. Deleting them will start a new
					game.
				</p>
			)}
			<div className="flex gap-3 justify-end">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-100 transition-colors"
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={onConfirm}
					className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
				>
					Delete
				</button>
			</div>
		</dialog>
	);
});
