import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#0B5CFF", // Primary
          600: "#0247DB",
          700: "#0036B3",
          800: "#00288A",
          900: "#001D66",
        },
        cyan: {
          accent: "#13B8E6",
        },
        mint: {
          accent: "#28D7A1",
        },
        gold: {
          accent: "#FFC857",
        },
        navy: {
          text: "#0B1736",
          dark: "#080F21",
          card: "#0E1830",
        },
        surface: {
          light: "#F7FBFF",
          card: "#FFFFFF",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Be Vietnam Pro", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(11, 92, 255, 0.25)",
        "glow-cyan": "0 0 25px -5px rgba(19, 184, 230, 0.3)",
        "glow-mint": "0 0 25px -5px rgba(40, 215, 161, 0.3)",
        card: "0 4px 20px -2px rgba(11, 23, 54, 0.05)",
        "card-hover": "0 12px 32px -4px rgba(11, 23, 54, 0.12)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
