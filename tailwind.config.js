module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        mainColor: {
          100: '#3CB371',
          200: '#3CB371',
          300: '#2E8A57',
        },
        ufesgi: {
          100: '',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('tw-elements/dist/plugin.cjs')],
};
