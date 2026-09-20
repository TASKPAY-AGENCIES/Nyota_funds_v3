/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'emerald-primary': '#34D468',
        'emerald-dark': '#22a84f',
        'emerald-glow': 'rgba(52,212,104,0.15)',
        'emerald-border': 'rgba(52,212,104,0.25)',
        'night-900': '#060A07',
        'night-800': '#0b1a0e',
        'night-700': '#112214',
        'night-600': '#1a3d22',
        'night-500': '#2d5235',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
}
