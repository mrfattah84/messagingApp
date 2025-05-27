import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#2563EB", // A rich, accessible blue
            background: "#F9FAFB", // Soft light gray for main background
            "background-secondary": "#F3F4F6", // Slightly darker secondary background
            "background-tertiary": "#E5E7EB", // Tertiary for cards or contrast areas
            "background-quaternary": "#D1D5DB", // Optional depth layer
            foreground: "#111827", // Deep slate for high contrast
            muted: "#6B7280", // Muted slate for less emphasis
            border: "#E5E7EB", // Gentle border contrast
          },
        },
        dark: {
          colors: {
            primary: "#2563EB", // Consistent brand color
            background: "#18181B", // Dark near-black background
            "background-secondary": "#232225", // Slightly lighter secondary layer
            "background-tertiary": "#2A2A2E", // Tertiary for panel-like UI
            "background-quaternary": "#3A3A3C", // Deep layer separation
            foreground: "#FFFFFF", // White text for clarity
            muted: "#A1A1AA", // Soft gray for muted elements
            border: "#27272A", // Subtle borders
          },
        },
      },
    }),
  ],
};
