/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    screens: {
      'xl': {'max': '1200px'},

      'lg': {'max': '1024px'},

      'md': {'max': '768px'},

      'md2': {'max': '640px'},

      'sm': {'max': '420px'},

      'xs': {'max':'330px'}
    }
  },
  plugins: [],
}

