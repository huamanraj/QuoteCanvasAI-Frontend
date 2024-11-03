/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'merriweather': ['Merriweather', 'serif'],
        'lora': ['Lora', 'serif'],
        'crimson': ['"Crimson Text"', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'opensans': ['"Open Sans"', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'abril': ['"Abril Fatface"', 'cursive'],
        'librebaskerville': ['"Libre Baskerville"', 'serif'],
        'sourceserif': ['"Source Serif Pro"', 'serif'],
        'philosopher': ['Philosopher', 'sans-serif'],
        'spectral': ['Spectral', 'serif'],
      },
    },
  },
  plugins: [],
}