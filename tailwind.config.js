const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    minWidth: {
      "3rem": "3rem",
      "8rem": "8rem",
    },
    extend: {
      colors: {
        mainColor: {
          100: "#3CB371",
          200: "#3CB371",
          300: "#2E8A57",
        },
        admin: "#1e293b",
        ufesgi: {
          100: "",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
});
