import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          50: "#fef9ee",
          100: "#fdf0d3",
          200: "#fadea5",
          300: "#f7c56d",
          400: "#f3a032",
          500: "#f0810f",
          600: "#e1620a",
          700: "#bb460c",
          800: "#953712",
          900: "#792f12",
        },
        slate: {
          850: "#1a2035",
          950: "#0d1117",
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(40px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        tilegallery: {
          primary: "#f0810f",
          "primary-content": "#ffffff",
          secondary: "#1a2035",
          "secondary-content": "#ffffff",
          accent: "#d4a853",
          "accent-content": "#1a2035",
          neutral: "#2a2e35",
          "neutral-content": "#ffffff",
          "base-100": "#0d1117",
          "base-200": "#131920",
          "base-300": "#1a2035",
          "base-content": "#e8eaf0",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
    darkTheme: "tilegallery",
  },
};
