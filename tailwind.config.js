/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#22c55e',
          dark: '#15803d',
        },
      },
    },
  },
  plugins: [],
};
