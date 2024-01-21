/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["GothicFont", "sans-serif"],
        sweet: ["SweetFont", "sans-serif"],
        classic: ["ClassicFont", "sans-serif"],
      },
      animation: {
        "bgPan-sweet": "bgPan-sweet 30s linear infinite",
        "bgPan-classic": "bgPan-classic 30s linear infinite",
        "bgPan-gothic": "bgPan-gothic 30s linear infinite",
        "copy-confirm": "copy-confirm 1s ease-out forwards",
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
        "copy-confirm": {
          "0%": { opacity: 1, transform: "translateY(0) translateX(-50%)" },
          "65%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            transform: "translateY(-10px) translateX(-50%)",
          },
        },
      },
      backgroundImage: {
        classic: "url('/classicbg.jpg')",
        sweet: "url('/sweetbg.jpg')",
        gothic: "url('/gothicbg.jpg')",
      },
    },
  },
  plugins: [],
}
