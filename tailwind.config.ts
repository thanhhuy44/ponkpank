import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "24px",
        },
        center: true,
        screens: {
          sm: "640px",

          md: "768px",

          lg: "1024px",

          xl: "1280px",
        },
      },
      colors: {
        primary: {
          "50": "#f1f5fd",
          "100": "#e0e9f9",
          "200": "#c7d9f6",
          "300": "#a1c1ef",
          "400": "#74a0e6",
          "500": "#537fde",
          "600": "#3f64d2",
          "700": "#344fbc",
          "800": "#31439c",
          "900": "#2c3c7c",
          "950": "#1f264c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
