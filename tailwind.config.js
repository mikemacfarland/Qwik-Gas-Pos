/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors:{
        // nuetral-100
        'primary-color':'rgb(229 229 229)',
        // white
        'secondary-color':'white',
        // gray-500
        'tertiary-color':'rgb(107 114 128)', 
        // gray-100
        'quadrary-color':'rgb(226 232 240)',
        'mid-green': '#63c993',
        'unl-yellow': '#fcc482',
        'sup-blue': '#6492ec'
        
      },
    },
  },
  plugins: [],
};
