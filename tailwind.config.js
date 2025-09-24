/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...defaultConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif"],
      },
      colors: {
        ...defaultConfig.theme.extend.colors,
        night: "#0B0F19",
        ink: "#0A0E16",
        aurora: {
          purple: "#7C3AED",
          teal: "#14B8A6",
          blue: "#22D3EE",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 58, 237, .35), inset 0 0 12px rgba(34, 211, 238, .15)",
        glowTeal: "0 0 40px rgba(20, 184, 166, .35), inset 0 0 12px rgba(124, 58, 237, .15)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseSoft: {
          "0%,100%": { opacity: 0.8 },
          "50%": { opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        floatSlow: "float 20s ease-in-out infinite",
        pulseSoft: "pulseSoft 6s ease-in-out infinite",
        shimmer: "shimmer 10s linear infinite",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}
