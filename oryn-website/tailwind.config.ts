import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oryn: {
          orange: "#FF6A1A",
          "orange-light": "#FF8A4C",
          "orange-dark": "#E55A10",
          black: "#121212",
          white: "#FAFAFA",
          grey: "#D9D9D9",
          "grey-dark": "#1A1A1A",
          "grey-mid": "#2A2A2A",
          "grey-light": "#F5F5F5",
        },
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        plex: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      letterSpacing: {
        brand: "0.2em",
        wide: "0.05em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-in-left": "slideInLeft 0.8s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(255, 106, 26, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(255, 106, 26, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
