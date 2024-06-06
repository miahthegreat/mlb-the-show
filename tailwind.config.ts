import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        common: 'rgba(255, 255, 255, 0.1)',
        bronze: 'rgba(96, 56, 34, 0.1)',
        silver: 'rgba(100, 101, 105, 0.1)',
        gold: 'rgba(253, 207, 23, 0.1)',
        diamond: 'rgba(66, 177, 253, 0.1)',
        yankees: {
          primary: '#003087',
          secondary: '#E4002B',
        },
        redsox: {
          primary: '#BD3039',
          secondary: '#0C2340',
        },
        dodgers: {
          primary: '#005A9C',
          secondary: '#EF3E42',
        },
        giants: {
          primary: '#FD5A1E',
          secondary: '#27251F',
        },
        // Continue adding the rest of the teams
        diamondbacks: {
          primary: '#A71930',
          secondary: '#E3D4AD',
        },
        braves: {
          primary: '#CE1141',
          secondary: '#13274F',
        },
        orioles: {
          primary: '#DF4601',
          secondary: '#000000',
        },
        cubs: {
          primary: '#0E3386',
          secondary: '#CC3433',
        },
        whitesox: {
          primary: '#27251F',
          secondary: '#C4CED4',
        },
        reds: {
          primary: '#C6011F',
          secondary: '#000000',
        },
        indians: {
          primary: '#0C2340',
          secondary: '#E31937',
        },
        rockies: {
          primary: '#33006F',
          secondary: '#C4CED4',
        },
        tigers: {
          primary: '#0C2340',
          secondary: '#FA4616',
        },
        astros: {
          primary: '#EB6E1F',
          secondary: '#002D62',
        },
        royals: {
          primary: '#004687',
          secondary: '#C09A5B',
        },
        angels: {
          primary: '#BA0021',
          secondary: '#003263',
        },
        marlins: {
          primary: '#00A3E0',
          secondary: '#EF3340',
        },
        brewers: {
          primary: '#12284B',
          secondary: '#FFC52F',
        },
        twins: {
          primary: '#002B5C',
          secondary: '#D31145',
        },
        mets: {
          primary: '#002D72',
          secondary: '#FF5910',
        },
        athletics: {
          primary: '#003831',
          secondary: '#EFB21E',
        },
        phillies: {
          primary: '#E81828',
          secondary: '#002D72',
        },
        pirates: {
          primary: '#FDB827',
          secondary: '#27251F',
        },
        padres: {
          primary: '#2F241D',
          secondary: '#FFC425',
        },
        mariners: {
          primary: '#0C2C56',
          secondary: '#005C5C',
        },
        cardinals: {
          primary: '#C41E3A',
          secondary: '#0C2340',
        },
        rays: {
          primary: '#092C5C',
          secondary: '#8FBCE6',
        },
        rangers: {
          primary: '#003278',
          secondary: '#C0111F',
        },
        bluejays: {
          primary: '#134A8E',
          secondary: '#1D2D5C',
        },
        nationals: {
          primary: '#AB0003',
          secondary: '#14225A',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  safelist: [
    // Add safelist items here
    'bg-yankees-primary',
    'text-yankees-secondary',
    'bg-redsox-primary',
    'text-redsox-secondary',
    'bg-dodgers-primary',
    'text-dodgers-secondary',
    'ring-dodgers-primary',
    'ring-dodgers-secondary',
    'bg-giants-primary',
    'text-giants-secondary',
    'bg-diamondbacks-primary',
    'text-diamondbacks-secondary',
    'bg-braves-primary',
    'text-braves-secondary',
    'bg-orioles-primary',
    'text-orioles-secondary',
    'bg-cubs-primary',
    'text-cubs-secondary',
    'bg-whitesox-primary',
    'text-whitesox-secondary',
    'bg-reds-primary',
    'text-reds-secondary',
    'bg-indians-primary',
    'text-indians-secondary',
    'bg-rockies-primary',
    'text-rockies-secondary',
    'bg-tigers-primary',
    'text-tigers-secondary',
    'bg-astros-primary',
    'text-astros-secondary',
    'bg-royals-primary',
    'text-royals-secondary',
    'bg-angels-primary',
    'text-angels-secondary',
    'bg-marlins-primary',
    'text-marlins-secondary',
    'bg-brewers-primary',
    'text-brewers-secondary',
    'bg-twins-primary',
    'text-twins-secondary',
    'bg-mets-primary',
    'text-mets-secondary',
    'bg-athletics-primary',
    'text-athletics-secondary',
    'bg-phillies-primary',
    'text-phillies-secondary',
    'bg-pirates-primary',
    'text-pirates-secondary',
    'bg-padres-primary',
    'text-padres-secondary',
    'bg-mariners-primary',
    'text-mariners-secondary',
    'bg-cardinals-primary',
    'text-cardinals-secondary',
    'bg-rays-primary',
    'text-rays-secondary',
    'bg-rangers-primary',
    'text-rangers-secondary',
    'bg-bluejays-primary',
    'text-bluejays-secondary',
    'bg-nationals-primary',
    'text-nationals-secondary',
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config