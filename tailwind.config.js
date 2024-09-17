/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "864px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        customYellow: "#FFDF8C",
        customDarkGray: "#7B7B7B",
        customLightGray: "#B6B6B6",
        customExtraLightGray: "#CACACA",
        customMidGray: "#8D8D8D",
        customOrange: "#FE5F1E",
        customBlack: "#282828",
        customLightOrange: "#EB5A1E",
      },
    },
  },
  plugins: [],
};
