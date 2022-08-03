/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['src/**/*.js', 'src/**/*.jsx', './components/**/*.{html,js,jsx}'],
  fontFamily: {
    sans: ['Inter var', ...defaultTheme.fontFamily.sans],
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
