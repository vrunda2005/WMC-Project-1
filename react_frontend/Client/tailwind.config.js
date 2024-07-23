/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }, 
        colors: {
          darkPurple: '#2e1f3d', // Dark purple color
          textLight: '#e0e0e0', // Light text color
        },
        backgroundImage: {
          'quiz-bg': "url('/path-to-your-image.jpg')", // Replace with your image path
        },
        backdropBlur: {
          xs: '4px', // Adding a small blur
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
    }, screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}

