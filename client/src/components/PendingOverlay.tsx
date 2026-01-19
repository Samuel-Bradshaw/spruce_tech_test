import type { FC } from "react";

type PendingOverlayProps = {
	isPending: boolean;
	error: Error | null;
	onDismissError?: () => void;
};

export const PendingOverlay: FC<PendingOverlayProps> = ({
	isPending,
	error,
	onDismissError,
}) => {
	if (isPending) {
		return (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-xl">
					<div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
					<p className="text-gray-700 font-medium">Saving game result...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-xl max-w-md">
					<p className="text-red-600 font-medium">Failed to save game result</p>
					<pre className="text-sm text-gray-600 bg-gray-100 p-3 rounded overflow-auto max-h-40 w-full">
						{error.message}
					</pre>
					<button
						type="button"
						onClick={onDismissError}
						className="px-4 py-2 bg-gray-800 text-white font-medium rounded hover:bg-gray-700 transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		);
	}

	return null;
};
