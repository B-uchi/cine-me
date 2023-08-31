/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/**/*.jsx","./src/pages/**/*.jsx", "./src/*.{html,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#191d2b",
        "secondary-color": "#27ae60",
        "accent-color": "#ff9800",
        "background-color": "#0f111a",
        "text-color": "#f5f5f5",
        "hover-color": "#3d4257",
      },
    },
  },
  plugins: [],
};
