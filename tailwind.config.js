/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
           50: '#f3f0ff',
          100: '#e9e2ff',
          200: '#d5c5ff',
          300: '#b794ff',
          400: '#9361ff',
          500: '#5E1FEB', 
          600: '#4c18cc',
          700: '#3d12a8',
          800: '#2f0d85',
          900: '#230866',
          950: '#150447',
        },
      },
      fontFamily: {
        jarkatalight: ['jarkatalight'],
        jarkataregular: ['jarkataregular'],
        jarkatamedium: ['jarkatamedium'],
        jarkatasemibold: ['jarkatarSemibold'],
        jarkatabold: ['jarkatabold'],
        clashmedium: ['clashmedium']
      },
    },
  },
  plugins: [],
};
