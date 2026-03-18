/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D2B5C',
          dark: '#081c3e',
          light: '#1a3d78',
        },
        blue: {
          brand: '#1769D4',
          light: '#2d7ff0',
          dark: '#1255b0',
        },
        gray: {
          brand: '#6B7280',
        },
        bg: {
          DEFAULT: '#080D1A',
          secondary: '#0d1525',
          card: '#0f1d35',
        },
        text: {
          primary: '#F8FAFC',
          muted: '#94a3b8',
          subtle: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'stripe-pattern': `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 10px,
          rgba(23, 105, 212, 0.04) 10px,
          rgba(23, 105, 212, 0.04) 20px
        )`,
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(23, 105, 212, 0.3)',
        'blue-glow-lg': '0 0 40px rgba(23, 105, 212, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
