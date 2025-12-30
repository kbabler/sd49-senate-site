/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './index.jsx'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#755FBE",
          navy: "#4B384C",
        }
      }
    },
  },
  plugins: [],
}
