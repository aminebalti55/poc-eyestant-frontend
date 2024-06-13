/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#ffffff',
        'light-text': '#424242',
        'light-icon': '#422afb',
        'light-circle': '#f4f7fe',
        'dark-bg': '#0b1437',
        'dark-card-bg': '#111c44',
        'dark-text': '#ffffff',
        'dark-icon': '#ffffff',
        'dark-circle': '#1b254b',
        'dark-subtext': '#a3aed0',
        'dark-sidebar-bg': '#111c44',
        'dark-sidebar-text': '#ffffff',
        'light-sidebar-bg': '#ffffff',
        'light-sidebar-text': '#424242',
        'custom-blue': '#4318FF', 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: 'class', 
};
