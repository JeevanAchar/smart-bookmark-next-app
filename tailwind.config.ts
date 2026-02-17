import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12121a",
        "ink-muted": "#4d4d63",
        paper: "#f7f4ee",
        glow: "#f2c94c",
        sunset: "#ff9a62",
        sky: "#5aa3d9",
        card: "#ffffff",
        border: "rgba(18, 18, 26, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
