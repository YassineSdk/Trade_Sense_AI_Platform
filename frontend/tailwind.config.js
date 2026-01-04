/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#1F2937',
          secondary: '#111827',
          tertiary: '#374151',
        },
        green: {
          primary: '#00FF7F',
          secondary: '#34D399',
          dark: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #00FF7F 0%, #34D399 100%)',
        'gradient-green-hover': 'linear-gradient(135deg, #34D399 0%, #00FF7F 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1F2937 0%, #111827 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 127, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 255, 127, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 127, 0.3)',
        'glow-md': '0 0 20px rgba(0, 255, 127, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 255, 127, 0.5)',
        'dark-xl': '0 20px 50px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
