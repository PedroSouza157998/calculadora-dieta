/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Garante que o Tailwind leia seus arquivos TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
