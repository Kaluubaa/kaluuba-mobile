/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A4F3C', // main brand green
          50:  '#E9F8F2',     // light mint white
          100: '#DFF7EC',
          200: '#B8EAD4',
          300: '#89D4B7',
          400: '#4FB98E',
          500: '#0F6A4B',     // mid jungle green
          600: '#0A4F3C',     // deep teal green
          700: '#083F31',
          800: '#063326',
          900: '#032018',
          950: '#01100C',     // ultra dark green
        },

        gradient: {
          start: '#003B2E',   // deep emerald
          mid: '#0A4F3C',     // teal green
          end: '#0F6A4B',     // jungle green
        },

        glass: {
          light: 'rgba(255, 255, 255, 0.12)',
          medium: 'rgba(255, 255, 255, 0.18)',
          heavy: 'rgba(255, 255, 255, 0.26)',
        },
      },

      fontFamily: {
        interLight: ["InterLight"],
        inter: ["InterRegular"],
        interMedium: ["InterMedium"],
        interSemiBold: ["InterSemiBold"],
        interBold: ["InterBold"],
      },
    },
  },
  plugins: [],
};
