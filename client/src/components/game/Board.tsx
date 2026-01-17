import { type FC, useCallback, useRef } from "react";
import type { BoardState } from "./types";

type BoardProps = {
	board: BoardState;
	disabled?: boolean;
	winningLine?: number[];
	onCellClick?: (index: number) => void;
};

export const Board: FC<BoardProps> = ({
	board,
	disabled = false,
	winningLine,
	onCellClick,
}) => {
	const boardSize = Math.sqrt(board.length);
	const gridRef = useRef<HTMLDivElement>(null);
	const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const getLineCoords = useCallback(() => {
		if (!winningLine || winningLine.length < 2 || !gridRef.current) {
			return null;
		}

		const gridRect = gridRef.current.getBoundingClientRect();
		const firstCell = cellRefs.current[winningLine[0]];
		const lastCell = cellRefs.current[winningLine[winningLine.length - 1]];

		if (!firstCell || !lastCell) {
			return null;
		}

		const firstRect = firstCell.getBoundingClientRect();
		const lastRect = lastCell.getBoundingClientRect();

		const x1 = firstRect.left + firstRect.width / 2 - gridRect.left;
		const y1 = firstRect.top + firstRect.height / 2 - gridRect.top;
		const x2 = lastRect.left + lastRect.width / 2 - gridRect.left;
		const y2 = lastRect.top + lastRect.height / 2 - gridRect.top;

		// Extend line past cell centers by this fraction of the cell size
		const extension = 0.3;
		const dx = x2 - x1;
		const dy = y2 - y1;
		const length = Math.sqrt(dx * dx + dy * dy);
		const extendBy = firstRect.width * extension;
		const ux = (dx / length) * extendBy;
		const uy = (dy / length) * extendBy;

		return {
			x1: x1 - ux,
			y1: y1 - uy,
			x2: x2 + ux,
			y2: y2 + uy,
		};
	}, [winningLine]);

	/**
	 * End coords of the winning line, if any.
	 */
	const coords = winningLine ? getLineCoords() : null;

	return (
		<div className="relative" ref={gridRef}>
			<div
				className="grid bg-gray-300 p-1 rounded"
				style={{
					gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
					gap: "4px",
				}}
			>
				{board.map((cell, index) => (
					<button
						type="button"
						ref={(el) => {
							cellRefs.current[index] = el;
						}}
						onClick={() => onCellClick?.(index)}
						disabled={cell !== undefined || disabled}
						// biome-ignore lint/suspicious/noArrayIndexKey: Fixed length array
						key={index}
						className="bg-white w-16 h-16 flex items-center justify-center text-3xl font-bold cursor-pointer hover:bg-gray-100 transition-colors select-none disabled:cursor-default disabled:hover:bg-white"
					>
						{cell}
					</button>
				))}
			</div>
			{coords && (
				<svg className="absolute inset-0 w-full h-full pointer-events-none">
					<title>Winning line</title>
					<line
						x1={coords.x1}
						y1={coords.y1}
						x2={coords.x2}
						y2={coords.y2}
						stroke="#ef4444"
						strokeWidth="4"
						strokeLinecap="round"
					/>
				</svg>
			)}
		</div>
	);
};
