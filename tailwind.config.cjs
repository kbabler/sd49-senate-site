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
          purple: "#4B384C",
          teal: "#00c2cc",
          navy: "#4B384C",
          ink: "#0a0a0a",
        }
      }
    },
  },
  plugins: [],
}
