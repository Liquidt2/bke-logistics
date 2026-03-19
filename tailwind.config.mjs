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
          secondary: '#0b1220',
          card: '#0f1b30',
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
      borderRadius: {
        'ios': '16px',
        'ios-lg': '24px',
        'ios-xl': '32px',
      },
      boxShadow: {
        'blue-glow': '0 4px 16px rgba(23, 105, 212, 0.45), 0 2px 4px rgba(0,0,0,0.3)',
        'blue-glow-lg': '0 8px 28px rgba(23, 105, 212, 0.6), 0 4px 8px rgba(0,0,0,0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(23,105,212,0.15)',
        'btn-3d': '0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.2) inset, 0 4px 16px rgba(23,105,212,0.45), 0 2px 4px rgba(0,0,0,0.3)',
        'glass': '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
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
