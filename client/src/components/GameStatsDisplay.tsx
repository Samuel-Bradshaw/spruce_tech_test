import React from "react";

type GameStatsDisplayProps = {
  handleResetStats: () => void;
  xwins: number;
  owins: number;
  draws: number;
};

const GameStatsDisplay: React.FC<GameStatsDisplayProps> = ({
  handleResetStats,
  xwins,
  owins,
  draws,
}) => {
  const stats = [
    { label: "X Wins", value: xwins, bg: "bg-blue-100", text: "text-blue-800" },
    { label: "O Wins", value: owins, bg: "bg-red-100", text: "text-red-800" },
    { label: "Draws", value: draws, bg: "bg-gray-100", text: "text-gray-800" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, bg, text }) => (
          <div
            key={label}
            className={`${bg} ${text} rounded-2xl shadow p-6 flex flex-col items-center`}
          >
            <span className="text-sm uppercase mb-2 font-semibold">
              {label}
            </span>
            <span className="text-3xl font-bold">{value}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleResetStats}
        className="mt-6 w-full sm:w-auto bg-red-500 hover:bg-red-600 active:bg-red-700
             text-white font-semibold py-2 px-6 rounded-2xl shadow transition"
      >
        Reset&nbsp;Scores
      </button>
    </div>
  );
};

export default GameStatsDisplay;
