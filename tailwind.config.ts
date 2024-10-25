import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          blue: "#37AFE1", // Bright blue
          bluedark: "#0096FF", // Darker blue
        },
        theme: {
          background: "#191919", // Dark background
          text: "#FFFFFF", // White text
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
	  fontFamily: {
		sans: ['Lato', 'sans-serif'],
	  },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
