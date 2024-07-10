import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-blue': '#13126C',
        'custom-dark': '#171731',
        'custom-gray': '#65657B',
        'custom-light-gray': '#E7E9EF',
        'custom-medium-gray': '#6D7088',
        'custom-error-red': '#C34648',
        'custom-success-green': '#227C6C',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
        arial: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
