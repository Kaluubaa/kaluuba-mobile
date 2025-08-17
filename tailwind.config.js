/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fafa',
          100: '#d8f0f1',
          200: '#a9dee0',
          300: '#75cacc',
          400: '#3eaeb0',
          500: '#167D7F', // base
          600: '#116567',
          700: '#0d4e50',
          800: '#093839',
          900: '#052425',
          950: '#021414',
        },
      },
      fontFamily: {
        jarkatalight: ['jarkatalight'],
        jarkataregular: ['jarkataregular'],
        jarkatamedium: ['jarkatamedium'],
        jarkatasemibold: ['jarkatarSemibold'],
        jarkatabold: ['jarkatabold'],
        clashmedium: ['clashmedium'],
      },
    },
  },
  plugins: [],
};
