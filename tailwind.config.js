/** @type {import('tailwindcss').Config} */

const tailwindColors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pageLayout/**/*.{js,ts,jsx,tsx,css,scss}",
    "./pages/**/*.{js,ts,jsx,tsx,css,scss}",
    "./components/**/*.{js,ts,jsx,tsx,css,scss}",
    "./layouts/**/*.{js,ts,jsx,tsx,css,scss}",
    "./pageElement/**/*.{js,ts,jsx,tsx,css,scss}",
  ],
  theme: {
    extend: {},
    colors: {
      ...tailwindColors,
      "carman-gray-1": "#333333",
      "carman-gray-2": "#222222",
      "carman-gray-3": "#4a4a4a",
      "carman-gray-4": "#909090",
      "carman-gray-5": "#BBBBBB",
      "carman-gray-6": "#E1E8F5",
      "carman-gray-7": "#F4F4F4",
      "carman-gray-8": "#828282",
      "carman-gray-9": "#E2E8F4",
      "carman-gray-10": "#f0f6ff",
      "carman-red-1": "#EB5757",
      "carman-black-1": "#06142F",
      "carman-black-2": "#3D4451",
      "carman-blue-0": "#005fbb",
      "carman-blue-1": "#017FFA",
      "carman-blue-2": "#394f69",
      "carman-blue-3":"#203e86",
      "carman-blue-9": "#dae8fc",
      "carman-blue-10": "#D1E3FC",
      "carman-purple-1":"#D7E4FF",
      "carman-yellow-1":"#FFEFD8",
    },
    fontSize: {
      "xs": ["0.75rem", "1rem"],
      "sm": ["0.875rem", "1.25rem"],
      "base": ["1rem", "1.5rem"],
      "lg": ["1.125rem", "1.75rem"],
      "xl": ["1.25rem", "1.75rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.25rem"],
      "4xl": ["2.25rem", "2.5rem"],
      "small": ["12px", "16px"],
      "medium": ["14px", "20px"],
      "large": ["16px", "24px"],
      "heading2": [
        "24px",
        {
          lineHeight: "32px",
          fontWeight: "bold",
        },
      ],
      "heading3": [
        "20px",
        {
          lineHeight: "28px",
          fontWeight: "bold",
        },
      ],
      "heading4": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "bold",
        },
      ]
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      {
      winter: {
        ...require("daisyui/src/colors/themes")["[data-theme=winter]"],
        accent:"#EB5757",
        info:"#3578F6"
      }
    }
  ],
  },
};
