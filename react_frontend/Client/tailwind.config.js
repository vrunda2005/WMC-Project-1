/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#1a202c',         // Dark background color
        'secondary-bg': '#2d3748',       // Slightly lighter dark color for sections
        'highlight': '#4299e1',          // Vibrant blue for call-to-action buttons and highlights
        'overlay': 'rgba(0, 0, 0, 0.3)', // Overlay color
        'text-light': '#edf2f7',         // Light text color for readability on dark backgrounds
        'text-blue': '#63b3ed',          // Light blue for text
        'text-dark': '#2d3748',          // Dark text color for light backgrounds
        'accent': '#3182ce',             // Blue for accents
        'muted': '#a0aec0',              // Muted color for less important text
        'success': '#48bb78',            // Green color for success messages
        'error': '#e53e3e',              // Red color for error messages
      },
      backgroundImage: {
        'hero-pattern': 'url("./assets/images/CrisFormage-GTAV.png")',
        'footer-texture': 'url("./assets/images/footer-texture.png")',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(20px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeOut: 'fadeOut 1s ease-in-out',
        bounce: 'bounce 1s infinite',
      },
      boxShadow: {
        'outline': '0 0 0 3px rgba(237, 137, 54, 0.5)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
