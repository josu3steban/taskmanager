/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/*.jsx', './src/**/*.jsx'],
  theme: {
    extend: {
      screens: {
        'sm': {'max': '640px'},
        'md': {'min': '641px'},
      },

      colors: {
        'my-color-one'    : '#EDF2F4',
        'my-color-two'    : '#17B890',
        'my-color-three'  : '#EF233C',
        'my-color-four'   : '#011627',
        'my-color-five'   : '#1d3557',
      }
    },
  },
  plugins: [],
}
