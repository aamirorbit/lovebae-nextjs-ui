/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: '#e6e6e6',
        input: '#e6e6e6',
        ring: '#ef4444',
        background: '#ffffff',
        foreground: '#252525',
        primary: {
          DEFAULT: '#ef4444',
          foreground: '#fafafa',
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          foreground: '#333333',
        },
        destructive: {
          DEFAULT: '#f43f5e',
          foreground: '#fafafa',
        },
        muted: {
          DEFAULT: '#f5f5f5',
          foreground: '#8c8c8c',
        },
        accent: {
          DEFAULT: '#60a5fa',
          foreground: '#333333',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#252525',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#252525',
        },
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.425rem",
        sm: "0.225rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 