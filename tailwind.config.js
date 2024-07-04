/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "xs": "320px"
      },
      colors:
      {
        "melikechan-gold": "#e79518",
        "melikechan-pink": "#e71878",
        "melikechan-purple": "#a70e7f",
        "melikechan-deep-purple": "#9a0ca6",
        "melikechan-blue": "#6913ec",
      }
    },
  },
  plugins: [],
};
