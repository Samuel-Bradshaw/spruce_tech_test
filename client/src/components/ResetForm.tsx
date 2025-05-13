import React from 'react';

type ResetFormProps = {
  boardSize: number;
  setBoardSize: (size: number) => void;
  resetGame: () => void;
};

const ResetForm: React.FC<ResetFormProps> = ({
  boardSize,
  setBoardSize,
  resetGame,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetGame();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-10 items-center">
      <div className="flex flex-col">
        <label htmlFor="board-size" className="mb-1 font-medium text-gray-700">
          Board Size (3–15)
        </label>
        <input
          id="board-size"
          name="boardSize"
          type="number"
          min={3}
          max={15}
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
          required
          className="
            peer
            border border-gray-300 rounded-md
            px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-400
            invalid:border-red-500 invalid:ring-red-200
            transition
          "
        />
        <p className="mt-1 text-sm text-red-600 invisible peer-invalid:visible">
          Please enter a number between 3 and 15.
        </p>
      </div>
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Reset
      </button>
    </form>
  );
};

export default ResetForm;
