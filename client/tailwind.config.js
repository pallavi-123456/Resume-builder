/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F7F8FA",
          card: "#FFFFFF",
        },
        ink: {
          950: "#0B1220",
          900: "#131B2E",
          800: "#1C2942",
          700: "#28375A",
        },
        navy: {
          400: "#4A6FA5",
          500: "#2E4E7E",
          600: "#1E3A5F",
          700: "#16304D",
        },
        gold: {
          300: "#E6C874",
          400: "#D9B54A",
          500: "#C9A227",
          600: "#A8841C",
        },
        ink500: "#1B2130",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.08)",
        "card-hover": "0 4px 12px rgba(16, 24, 40, 0.10), 0 2px 4px rgba(16, 24, 40, 0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
