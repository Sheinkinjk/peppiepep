import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const tiffanyPalette = {
  50: "#F1FCFD",
  100: "#DDF8FA",
  200: "#BDEFF3",
  300: "#8DE3EA",
  400: "#57D3DE",
  500: "#22C0CD",
  600: "#0AA7B5",
  700: "#00838F",
  800: "#006C76",
  900: "#055965",
  950: "#033C45",
};

const tiffanyTealPalette = {
  50: "#F2FBFB",
  100: "#DEF7F6",
  200: "#BFEDEA",
  300: "#95DFDB",
  400: "#64CBC6",
  500: "#35B3AD",
  600: "#1B9893",
  700: "#0B7B78",
  800: "#0B6464",
  900: "#0D5354",
  950: "#062F31",
};

const tiffanyNeutralPalette = {
  50: "#F5F9F9",
  100: "#EAF1F2",
  200: "#D5E2E3",
  300: "#B2C6C9",
  400: "#8CA6AA",
  500: "#6C888E",
  600: "#546F75",
  700: "#41595F",
  800: "#2E4247",
  900: "#1C2E33",
  950: "#0C191D",
};

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        brand: {
          light: "#4DD0E1",
          dark: "#00838F",
          grey: "#616161",
          lightGrey: "#BDBDBD",
        },
        blue: tiffanyPalette,
        cyan: tiffanyPalette,
        sky: tiffanyPalette,
        indigo: tiffanyTealPalette,
        teal: tiffanyTealPalette,
        purple: tiffanyPalette,
        pink: tiffanyPalette,
        slate: tiffanyNeutralPalette,
        gray: tiffanyNeutralPalette,
        zinc: tiffanyNeutralPalette,
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
