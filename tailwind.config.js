/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        negative: "#FF0000",
        "negative-dim": "#d00000",
        "negative-dimmer": "#a70000",
        primary: "#3B99EA",
        front: "#FFFFFF",
        dark: "#0F0F0F",
        dimmest: "#292627",
        dimmer: "#403E3E",
        dim: "#535353",
      },
    },
  },
  plugins: [require("tailwindcss-font-inter")],
};
