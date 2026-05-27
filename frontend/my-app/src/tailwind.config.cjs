/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  dark: "class",
  theme: {
    extend: {
      colors: {
        // Base background & text
        background: "var(--bg)",
        foreground: "var(--text)",

        // Primary brand colors
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        // Secondary UI colors
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        // Accent / highlights
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        // UI states
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        border: "var(--border)",
        card: "var(--card)",
      },
    },
  },
  plugins: [],
};
