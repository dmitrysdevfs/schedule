/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FED172',
          100: '#FABF42',
          200: '#E9AC32', // Main
          300: '#D18E1B',
          400: '#A86415',
          500: '#B16009',
          DEFAULT: '#E9AC32',
        },
        secondary: {
          DEFAULT: '#0C0614',
          '100': '#0C0614',
          '75': 'rgba(12, 6, 20, 0.75)',
          '50': 'rgba(12, 6, 20, 0.50)',
          '25': 'rgba(12, 6, 20, 0.25)',
          '800': '#17121D', // Component Background
        },
        white: {
          DEFAULT: '#F4F1EB',
          '100': '#F4F1EB',
          '75': 'rgba(253, 252, 252, 0.75)',
          '50': 'rgba(253, 252, 252, 0.50)',
          '25': 'rgba(253, 252, 252, 0.25)',
        },
        grey: {
          100: '#E4E2DD',
          200: '#BAB8B3',
          300: '#8F8C84',
          400: '#6B6862',
          500: '#252422',
          DEFAULT: '#6B6862',
        },
        error: {
          100: '#CE0E41',
          DEFAULT: '#CE0E41',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'button-pressed': 'inset 5px 6px 4px rgba(12, 17, 31, 0.3)',
      },
    },
  },
  plugins: [],
}
