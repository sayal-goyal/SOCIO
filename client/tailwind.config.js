/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bottle-green': '#5C8771',
        'bottle-blue': '#0D8299',

        'custom-blue': '#010851',
        'custom-blue-light': '#0f1b7a'
      },
      backgroundColor: {
        'white-pri': '#fff',
        'white-sec': '#FAF5FF',
        'blue-pri': '11111d',
        'blue-sec': '#1d1b31',
      },
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif'],
        'noto-sans': ['Noto Sans']
      },
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-22': 'span 22 / span 22',
        'span-20': 'span 20 / span 20',
      },
    },
  },
  plugins: [],
}