import type { Config } from "tailwindcss";

/** Consume a CSS custom property holding an "R G B" triplet. */
const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

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
        // Token-backed palette. Values live in globals.css.
        void: rgb("--void"),
        surface: rgb("--surface"),
        elevated: rgb("--elevated"),
        line: rgb("--border"),
        "line-bright": rgb("--border-bright"),
        accent: {
          DEFAULT: rgb("--accent"),
          deep: rgb("--accent-deep"),
        },
        ink: {
          DEFAULT: rgb("--text-primary"),
          muted: rgb("--text-muted"),
          dim: rgb("--text-dim"),
        },

        // Legacy aliases — kept so existing components keep compiling
        // while sections are migrated phase by phase.
        main: {
          blue: rgb("--accent"),
          bluedark: rgb("--accent-deep"),
        },
        theme: {
          background: rgb("--void"),
          text: rgb("--text-primary"),
        },
      },
      fontFamily: {
        // Bound to next/font CSS variables set in layout.tsx.
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // Legacy alias: existing markup uses font-montserrat for headings.
        montserrat: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        // Named entrance durations: arbitrary values like duration-[900ms]
        // collide with the tokens above and emit an ambiguity warning.
        entrance: "900ms",
        "entrance-lg": "1200ms",
        "entrance-xl": "1400ms",
      },
      maxWidth: {
        measure: "var(--measure)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
