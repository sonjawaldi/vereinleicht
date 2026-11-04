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
        vl: {
          canvas: 'var(--canvas)',
          surface: 'var(--surface)',
          heading: 'var(--heading)',
          body: 'var(--body)',
          muted: 'var(--muted)',
          border: 'var(--border)',
          primary: 'var(--primary)',
          ink: 'var(--primary-ink)',
        },
      },
    },
  },
  plugins: [],
};
