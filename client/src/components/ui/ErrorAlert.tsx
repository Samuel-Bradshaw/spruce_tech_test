import React from "react";

export function ErrorAlert(message: string): React.ReactNode {
  return (
    <div
      className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded"
      role="alert"
    >
      {message}
    </div>
  );
}
