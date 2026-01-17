import React, { forwardRef } from "react";

type ConfirmDialogProps = {
	title: string;
	message: string;
	onConfirm: () => void;
};

export const ConfirmDialog = forwardRef<HTMLDialogElement, ConfirmDialogProps>((
	{ title, message, onConfirm },
	ref
) => {
	return (
		<dialog
			ref={ref}
			className="p-6 rounded-lg shadow-xl backdrop:bg-black/50"
		>
			<form method="dialog">
				<h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
				<p className="text-gray-600 mb-6">{message}</p>
				<div className="flex gap-3 justify-end">
					<button
						type="submit"
						className="px-4 py-2 text-gray-600 font-medium rounded hover:bg-gray-100 transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						onClick={onConfirm}
						className="px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
					>
						Confirm
					</button>
				</div>
			</form>
		</dialog>
	);
});
