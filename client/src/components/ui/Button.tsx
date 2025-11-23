import React from "react";
import { ButtonProps } from "../OutcomeView";

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="mt-4 px-8 py-3 bg-accent-sage hover:bg-border-light active:bg-accent-hover text-background-dark font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
      {...props}
    >
      {children}
    </button>
  );
}
