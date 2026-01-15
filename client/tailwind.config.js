module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#0a1f1a",
          primary: "#10392f",
          secondary: "#1a4d3e",
          light: "#227858",
        },
        accent: {
          sage: "#9fc99e",
          hover: "#8bb88a",
        },
        text: {
          primary: "#ffffff",
          secondary: "#f3f4f6",
          dark: "#1f2937",
        },
        border: {
          primary: "#227858",
          accent: "#9fc99e",
          light: "#b5ddb4",
        },
        status: {
          success: "#22c55e",
          error: "#ef4444",
        },
      },
    },
  },
};
