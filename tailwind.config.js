/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseBg: "#fafafb",
        themeBlue: "#2f80ed",
        themGray: "#f6f8fb",
      },
    },
  },
  plugins: [],
};
