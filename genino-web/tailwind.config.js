/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-genino-50',
    'text-genino-100',
    'text-genino-200',
    'text-genino-300',
    'text-genino-400',
    'text-genino-500',
    'text-genino-600',
    'text-genino-700',
    'text-genino-800',
    'text-genino-900',
  ],
  theme: {
    extend: {
      colors: {
        genino: {
          50: "#fffaf0",
          100: "#fef7dc",
          200: "#fceea9",
          300: "#f9e26e",
          400: "#f5cf3d",
          500: "#FFD700",
          600: "#e6be00",
          700: "#b99700",
          800: "#8c7100",
          900: "#594600",
        },
      },
      backgroundImage: {
        "genino-gradient": "linear-gradient(to bottom right, #f9e26e, #FFD700, #b99700)",
      },
    },
  },
  plugins: [],
};
