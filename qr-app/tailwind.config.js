module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // You can add custom theme extensions here
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
