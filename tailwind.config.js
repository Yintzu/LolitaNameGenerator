/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["GothicFont", "sans-serif"],
        sweet: ["SweetFont", "sans-serif"],
        classic: ["ClassicFont", "sans-serif"],
        brand: ["BrandFont", "sans-serif"],
      },
      animation: {
        "bgPan-sweet": "bgPan-sweet 30s linear infinite",
        "bgPan-classic": "bgPan-classic 30s linear infinite",
        "bgPan-gothic": "bgPan-gothic 30s linear infinite",
        "bgPan-brand": "bgPan-brand 30s linear infinite",
        "copy-confirm": "copy-confirm 1s ease-out forwards",
        "pop-in": "pop-in 0.4s ease-out forwards",
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
        "bgPan-brand": {
          "0%": { backgroundPosition: "1600px 0px" },
          "100%": { backgroundPosition: "0px 800px" },
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
        "pop-in": {
          "0%": { transform: "scale(1) perspective(1px) translateZ(0)" },
          "20%": { transform: "scale(1.1) perspective(1px) translateZ(0)" },
          "100%": { transform: "scale(1) perspective(1px) translateZ(0)" },
        },
      },
      backgroundImage: {
        classic: "url('/classicbg.jpg')",
        sweet: "url('/sweetbg.jpg')",
        gothic: "url('/gothicbg.jpg')",
        brand: "url('/brandbg.jpg')",
      },
      boxShadow: {
        "button-press": "0px 0px 5px rgba(0,0,0,0.5) inset;",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["active"],
    },
  },
  plugins: [],
}
