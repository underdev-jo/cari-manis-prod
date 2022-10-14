/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pageLayout/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#017FFA",
          secondary: "#F0F6FF",
          black: "#222222",
          "base-content": "#222222",
          "neutral-content": "#222222",
        },
      },
      "winter",
    ],
  },
};
