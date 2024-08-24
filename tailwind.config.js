/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customYellow: "#FFDF8C",
        customGray: "#7B7B7B",
        customOrange: "#FE5F1E",
        customBlack: "#282828",
      },
    },
  },
  plugins: [],
};
