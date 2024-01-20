/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      animation: {
        "bgPan-sweet": "bgPan-sweet 30s linear infinite",
        "bgPan-classic": "bgPan-classic 30s linear infinite",
        "bgPan-gothic": "bgPan-gothic 30s linear infinite",
      },
      keyframes: {
        "bgPan-sweet": {
          "0%": { backgroundPosition: "1000px 0px" },
          "100%": { backgroundPosition: "0px 500px" },
        },
        "bgPan-classic": {
          "0%": { backgroundPosition: "1000px 0px" },
          "100%": { backgroundPosition: "0px 436px" },
        },
        "bgPan-gothic": {
          "0%": { backgroundPosition: "1216px 0px" },
          "100%": { backgroundPosition: "0px 608px" },
        },
      },
      backgroundImage: {
        classic: "url('/classicbg.jpg')",
        sweet: "url('/sweetbg.jpg')",
        gothic: "url('/gothicbg.jpg')",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["gothic"],
    },
  },

  plugins: [],
}
