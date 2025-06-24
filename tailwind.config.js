/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/**/*.jsx","./src/pages/**/*.jsx", "./src/*.{html,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "primary": "#0f0f23",
        "secondary": "#1a1a2e", 
        "accent": "#ff6b6b",
        "accent-secondary": "#4ecdc4",
        "background": "#0a0a1a",
        "surface": "#1e1e3a",
        "text": "#ffffff",
        "text-secondary": "#a0a0a0",
        "text-muted": "#6b7280",
        "border": "#2d2d5a",
        "gradient-start": "#667eea",
        "gradient-end": "#764ba2",
        "gradient-accent-start": "#ff6b6b",
        "gradient-accent-end": "#ee5a24",
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
