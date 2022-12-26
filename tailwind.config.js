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
      "carman-gray-9": "#E2E8F4",
    },
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.125rem", "1.75rem"],
      xl: ["1.25rem", "1.75rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.25rem"],
      "4xl": ["2.25rem", "2.5rem"],
      small: ["12px", "16px"],
      medium: ["14px", "20px"],
      large: ["16px", "24px"],
      heading2: [
        "24px",
        {
          lineHeight: "32px",
          fontWeight: "bold",
        },
      ],
      heading3: [
        "20px",
        {
          lineHeight: "28px",
          fontWeight: "bold",
        },
      ],
      heading4: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "bold",
        },
      ],
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: ["winter"],
  },
};
