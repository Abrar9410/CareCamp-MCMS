/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        main: ['Open Sans', 'serif']
      },
      colors: {
        primary: '#0077B6',
        bg: {
          light: '#FFFFFF', // Light mode background
          dark: '#1A202C',  // Dark mode background
        },
        text: {
          light: '#2D3748', // Light mode text
          dark: '#FFFFFF',  // Dark mode text
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {theme: false}
}

