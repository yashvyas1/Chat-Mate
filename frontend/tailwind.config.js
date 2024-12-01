/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      const newUtilities = {
        // Cross-browser thin scrollbar
        ".scrollbar-thin": {
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "black", // For Firefox (thumb color and track color)
        },

        // WebKit-specific styling
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "4px", // Scrollbar width
          },
          "&::-webkit-scrollbar-track": {
            background: "black", // Scrollbar track background color
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "20px", // Rounded corners for the thumb
            background: "black",
          },
        },
      }
      addUtilities(newUtilities, ["Responsive", "hover"])
    }
  ],
}