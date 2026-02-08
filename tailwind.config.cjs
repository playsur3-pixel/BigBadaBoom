/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        logoDrop: {
          "0%": {
            opacity: "0",
            transform: "translateY(-200%) scale(0.8)",
          },
          "60%": {
            opacity: "1",
            transform: "translateY(0) scale(1.05)",
          },
          "80%": {
            transform: "translateY(-6%) scale(0.98)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        buttonFadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        logoDrop:
          "logoDrop 2s cubic-bezier(0.22, 0.61, 0.36, 1) 1s forwards",
        buttonFadeIn: "buttonFadeIn 1s ease-out 3s forwards",
      },
    },
  },
  plugins: [],
};
