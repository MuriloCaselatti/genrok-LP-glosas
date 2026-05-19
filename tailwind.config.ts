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
        navy: { DEFAULT: '#0A2540', light: '#0D3461' },
        teal: { DEFAULT: '#00B896', dark: '#009478' },
        danger: '#E53E3E',
        warning: '#F6AD55',
      },
      fontFamily: {
        display: ['var(--font-sora)', 'Sora', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
