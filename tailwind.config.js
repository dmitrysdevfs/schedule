/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Example base Blue-600, will refine in Stage 2
          hover: '#1d4ed8',
          pressed: '#1e40af',
          disabled: '#94a3b8',
        },
        secondary: {
          DEFAULT: '#64748b',
          hover: '#475569',
          pressed: '#334155',
          disabled: '#cbd5e1',
        },
      },
    },
  },
  plugins: [],
}
