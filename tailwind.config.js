/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#306B4F', // Dark green for primary buttons
          50: '#f0f9f4',
          100: '#dcf4e6',
          200: '#bce8d1',
          300: '#8dd5b3',
          400: '#4C9C70', // Light green for hover states and accents
          500: '#306B4F', // Dark green base
          600: '#2a5d45',
          700: '#244e3a',
          800: '#1e3f30',
          900: '#1a3528',
          950: '#0d1b14',
        },
        accent: {
          default: '#4C9C70', // Light green for secondary elements
          50: '#f0f9f4',
          100: '#dcf4e6',
          200: '#bce8d1',
          300: '#8dd5b3',
          400: '#4C9C70', // Light green base
          500: '#3d7c5a',
          600: '#336648',
          700: '#2a5139',
          800: '#22412e',
          900: '#1d3627',
          950: '#0f1d15',
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
