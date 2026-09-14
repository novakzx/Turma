import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F6FF',
          100: '#E0EEFE',
          200: '#BAE0FD',
          300: '#7CC5FB',
          400: '#38A6F6',
          500: '#0E85EB',
          600: '#0168C9',
          700: '#0153A3',
          800: '#054685',
          900: '#0B3B6F',
          950: '#07254A',
        },
        electric: {
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        navy: {
          DEFAULT: '#040816',
          950: '#030712',
          900: '#050B18',
          850: '#081126',
          800: '#0C1836',
          750: '#102146',
          700: '#142956',
        },
        accent: {
          DEFAULT: '#38BDF8',
          soft: '#7DD3FC',
          glow: '#0284C7',
        },
        surface: '#030712',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(0, 0, 0, 0.5)',
        lift: '0 24px 60px -20px rgba(0, 0, 0, 0.7)',
        glow: '0 0 60px -12px rgba(14, 133, 235, 0.55)',
        'glow-blue': '0 0 50px -10px rgba(59, 130, 246, 0.45)',
        'glow-cyan': '0 0 50px -10px rgba(56, 189, 248, 0.4)',
        'glow-box': '0 0 40px -8px rgba(37, 99, 235, 0.35)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        phone: '0 60px 120px -30px rgba(1, 10, 30, 0.85)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-sm': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-14deg)' },
          '60%, 100%': { transform: 'translateX(250%) skewX(-14deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-sm': 'float-sm 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        shine: 'shine 3.2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
