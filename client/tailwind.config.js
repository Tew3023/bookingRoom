/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image": "url('https://images.rosewoodhotels.com/is/image/rwhg/DJI_0888_NewColor:WIDE-LARGE-16-9')"
      }
    }
  },
  plugins: [],
}
