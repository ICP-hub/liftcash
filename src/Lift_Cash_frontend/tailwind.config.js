// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: "class", // Enables class-based dark mode
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#479fe6",
//         secondary: "#111827",
//       },
//       fontFamily: {
//         inter: ["Inter", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"DM Sans Merlin"',
          "system-ui",
          "-apple-system",
          "Ubuntu",
          "sans-serif",
          // "font-inter",
        ],
      },
      fontSize: {
        base: ["16px", "1.5"],
        sm: ["14px", "1.4"],
        lg: ["20px", "1.5"],
        xl: ["24px", "1.5"],
        "2xl": ["28px", "1.5"],
        "3xl": ["30px", "1.5"],
        "4xl": ["48px", "1.2"],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        primary: "#479fe6",
        secondary: "#111827",
        cyan: "#01ACC9",
        coral: "#FF7E79",
        "orange-red": "#FF4500",
        gold: "#FFD700",
        "blue-violet": "#8A2BE2",
        black: "#000000",
        white: "#FFFFFF",
        "transparent-white": "#ffffff0d",
        "light-grey": "#e5e7eb",
        "dark-grey": "#27272a",
        "very-light-grey": "#fafafa",
        "medium-grey": "#71717a",
        "muted-grey": "#f4f4f5",
      },
    },
  },
  plugins: [],
};
