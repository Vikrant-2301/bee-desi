/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#faf7f2",
        "surface-dim": "#dddad2",
        "surface-bright": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5efe4",
        "surface-container": "#eee8dc",
        "surface-container-high": "#e7dfd1",
        "surface-container-highest": "#ded5c4",
        "on-surface": "#161311",
        "on-surface-variant": "#4d4137",
        "propolis-charcoal": "#0d0b09",
        "propolis-deep": "#161310",
        "honeycomb-cream": "#fffcf7",
        "beeswax-surface": "#f4ecde",
        "amber-radiance": "#d97706",
        "amber-deep": "#92400e",
        "golden-nectar": "#f59e0b",
        "gold-foil": "#fbbf24",
        "gold-shimmer": "#fde68a",
        "flora-sage": "#1e4532",
        "flora-sage-light": "#eaf3ed",
        primary: {
          DEFAULT: "#8f4f00",
          hover: "#b45309",
          dark: "#1e140e",
          light: "#fef3c7",
        },
        secondary: {
          DEFAULT: "#6b4f3b",
          dark: "#1f140e",
        },
        outline: "#7e6d5e",
        "outline-variant": "#d5c3b1",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "-apple-system", "sans-serif"],
        outfit: ["var(--font-outfit)", "Outfit", "sans-serif"],
        mono: ["Courier Prime", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        honey: "0 12px 36px -8px rgba(35, 18, 10, 0.12), 0 4px 16px -2px rgba(217, 119, 6, 0.08)",
        "honey-lg": "0 24px 52px -12px rgba(22, 12, 7, 0.22)",
        "honey-glow": "0 0 32px rgba(245, 158, 11, 0.35)",
        "gold-glow": "0 0 40px rgba(251, 191, 36, 0.4)",
        "amber-ring": "0 0 0 3px rgba(217, 119, 6, 0.3)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        drift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        }
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        drift: "drift 8s ease infinite",
      },
    },
  },
  plugins: [],
};
