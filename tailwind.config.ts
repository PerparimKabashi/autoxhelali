import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Gold & Black Theme
        'luxury': {
          black: '#0D0D0D',
          dark: '#151515',
          charcoal: '#1C1C1C',
          graphite: '#2A2A2A',
          gold: '#D4A853',
          'gold-light': '#E8C87D',
          'gold-dark': '#B8923F',
          cream: '#F5F0E8',
          platinum: '#E5E4E2',
        },
        'accent': {
          emerald: '#10B981',
          ruby: '#DC2626',
          sapphire: '#2563EB',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'heading': ['Cormorant Garamond', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
        'accent': ['Bebas Neue', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'border-flow': 'borderFlow 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 168, 83, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 168, 83, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4A853 0%, #E8C87D 50%, #B8923F 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #1C1C1C 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.1), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;
