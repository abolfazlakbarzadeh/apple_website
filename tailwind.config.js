/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{tsx,jsx,ts,js}"
  ],
  theme: {
    extend: {
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
    },
  },
  plugins: [],
}

