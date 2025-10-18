/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ← This is CRITICAL!
  theme: {
    extend: {},
  },
  plugins: [],
}
