/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors:{
        'mid-green': '#63c993',
        'unl-yellow': '#fcc482',
        'sup-blue': '#6492ec'
      }
    },
  },
  plugins: [],
};
