/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // preflight: false,
  },
  plugins: [],
  prefix: 'sth-'
}

