/** @type {import('tailwindcss').Config} */

const tailwindColors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pageLayout/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...tailwindColors,
      "carman-gray-1": "#333333",
      "carman-gray-2": "#222222",
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: ["winter"],
  },
};
