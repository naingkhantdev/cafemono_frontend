/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5E6C8',
          light: '#FDF6EC',
          dark: '#E8C99A',
        },
        brown: {
          DEFAULT: '#7B3B2A',
          light: '#A0522D',
          dark: '#5C2A1A',
        },
        cafe: {
          black: '#1A1209',
          tan: '#E8C99A',
          gold: '#C8963E',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(123,59,42,0.12)',
        'warm': '0 4px 20px rgba(123,59,42,0.18)',
        'warm-lg': '0 8px 40px rgba(123,59,42,0.25)',
        'warm-xl': '0 20px 60px rgba(123,59,42,0.30)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}