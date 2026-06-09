const { hairlineWidth } = require("nativewind/theme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      borderWidth: {
        hairline: hairlineWidth(),
      },
      colors: {
        background: "#F5F7FF",
        ink: "#0F172A",
        mint: "#34D399",
        pulse: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#6366F1",
          600: "#4F46E5",
          900: "#312E81",
        },
        sand: "#F8FAFC",
        slate: {
          100: "#F1F5F9",
          300: "#CBD5E1",
          500: "#64748B",
          700: "#334155",
          900: "#0F172A",
        },
        warning: "#F59E0B",
      },
    },
  },
  plugins: [],
};
