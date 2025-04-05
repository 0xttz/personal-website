/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Terracotta theme
        background: '#FDFBF7', // Very light beige
        card: '#F5F0E8', // Warm off-white for content areas
        'text-primary': '#4E423D', // Deep brown
        'text-secondary': '#A1887F', // Muted terracotta
        'accent-primary': '#C87E68', // Rich terracotta/burnt orange
        'accent-secondary': '#6A5ACD', // Slate Blue
        
        // Scandinavian theme (darker green with complementary purple)
        'scandi-background': '#EEF3F0', // Slightly darker cool background
        'scandi-card': '#DCE5E0', // More distinct off-white with green tint
        'scandi-text-primary': '#18281E', // Even darker forest green
        'scandi-text-secondary': '#3A4C40', // Deeper muted forest green
        'scandi-accent-primary': '#1C3B26', // Darker, more contrasting forest green
        'scandi-accent-secondary': '#7B4F9B', // Richer purple for better contrast
      },
      // Add themed color variables
      backgroundColor: {
        theme: 'var(--color-background)',
        'theme-card': 'var(--color-card)',
      },
      textColor: {
        theme: 'var(--color-text-primary)',
        'theme-secondary': 'var(--color-text-secondary)',
      },
      gradientColorStops: {
        'theme-primary': 'var(--color-accent-primary)',
        'theme-secondary': 'var(--color-accent-secondary)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

