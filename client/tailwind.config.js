/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Used in headings — bold, distinctive
        syne: ["Syne", "Arial Black", "sans-serif"],
        // Used in body/CTAs — clean, readable
        dm: ["DM Sans", "Helvetica Neue", "sans-serif"],
        // Used in mono/badge/label elements
        mono: ["DM Mono", "Courier New", "monospace"],
      },
      backgroundImage: {
        // Used on the Earth glow fallback and a few blobs
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        space: {
          950: "#020510",
          900: "#040d1f",
          800: "#071428",
        },
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
