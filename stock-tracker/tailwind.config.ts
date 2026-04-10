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
        dark: {
          main: '#08071A',
          card: '#0F0D2B',
          row: '#141233',
          border: '#2E2A5E',
          'out-of-stock': '#1A0A3A',
          'low-stock': '#1F1550',
        },
        accent: {
          deep: '#4C1D95',
          purple: '#7C3AED',
          light: '#A78BFA',
          'low-text': '#C4B5FD',
        },
        txt: {
          primary: '#EDE9FE',
          secondary: '#8B83C4',
        },
      },
    },
  },
  plugins: [],
};
export default config;
