/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New color scheme
        'dark-bg': '#000000',
        'primary': '#FF0B55',
        'secondary': '#CF0F47',
        'light-text': '#FFDEDE',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media' if you prefer media query based dark mode
}