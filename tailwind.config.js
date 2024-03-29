/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./icons/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern:
        /(bg|text)-(red|green|blue|orange|fuchsia|amber|lime|emerald|teal|cyan|sky|indigo|violet|purple|yellow|pink|rose)-(100|600)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        "blue-550": "#0070f3",
        "dark-bg": "rgb(15 23 42/1)",
      },
      transitionProperty: {
        width: "width",
      },
    },
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
      mon: ["Montserrat", "sans-serif"],
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [require("tailwindcss-animated")],
};
