import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2F0FF',
          100: '#E7E3FF',
          200: '#D1CAFF',
          300: '#B0A4FF',
          400: '#8B7BFB',
          500: '#6C56F0',
          600: '#5B45E6',
          700: '#4C36C7',
          800: '#3E2CA1',
          900: '#33287E',
          950: '#1F1746',
        },
        navy: {
          DEFAULT: '#0B1120',
          800: '#101A33',
          900: '#0B1120',
          950: '#070B16',
        },
        accent: {
          DEFAULT: '#F59E0B',
          soft: '#FDBA2C',
        },
        surface: '#F7F8FC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgb(17 12 46 / 0.12)',
        lift: '0 24px 60px -20px rgb(17 12 46 / 0.25)',
        glow: '0 0 60px -12px rgb(108 86 240 / 0.55)',
        phone: '0 60px 120px -30px rgb(10 8 40 / 0.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-sm': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-14deg)' },
          '60%, 100%': { transform: 'translateX(250%) skewX(-14deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-sm': 'float-sm 5s ease-in-out infinite',
        shine: 'shine 3.2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce-soft 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
