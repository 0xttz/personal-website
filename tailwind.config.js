/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFBF7', // Very light beige
        card: '#F5F0E8', // Warm off-white for content areas
        'text-primary': '#4E423D', // Deep brown
        'text-secondary': '#A1887F', // Muted terracotta
        'accent-primary': '#C87E68', // Rich terracotta/burnt orange
        'accent-secondary': '#6A5ACD', // NEW: Slate Blue
      }
    },
  },
  plugins: [],
}

