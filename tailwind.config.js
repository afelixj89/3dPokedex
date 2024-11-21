/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pokemon: ["Pokemon", "sans-serif"],
      },
      fontSize: {
        'xxs': '0.65rem', 
        'xxxs': '0.55rem'
      },
    },
  },
  plugins: [],
};