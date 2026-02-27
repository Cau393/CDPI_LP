/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0057b7', 
          lightBlue: '#0099ff', 
          cyan: '#00c2ff', 
          whatsapp: '#25D366'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}