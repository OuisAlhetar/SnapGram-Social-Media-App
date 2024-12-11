/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
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
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: "hsl(var(--card))",
				"card-foreground": "hsl(var(--card-foreground))",
				popover: "hsl(var(--popover))",
				"popover-foreground": "hsl(var(--popover-foreground))",
				primary: "hsl(var(--primary))",
				"primary-foreground": "hsl(var(--primary-foreground))",
				secondary: "hsl(var(--secondary))",
				"secondary-foreground": "hsl(var(--secondary-foreground))",
				muted: "hsl(var(--muted))",
				"muted-foreground": "hsl(var(--muted-foreground))",
				accent: "hsl(var(--accent))",
				"accent-foreground": "hsl(var(--accent-foreground))",
				destructive: "hsl(var(--destructive))",
				"destructive-foreground": "hsl(var(--destructive-foreground))",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				"dark-1": "#000000",
				"dark-2": "#121417",
				"dark-3": "#101012",
				"dark-4": "#1F1F22",
				"light-1": "#FFFFFF",
				"light-2": "#EFEFEF",
				"light-3": "#7878A3",
				"light-4": "#5C5C7B",
				"gray-1": "#697C89",
				primary: "#877EFF",
				"primary-500": "#877EFF",
				"primary-600": "#5D5FEF",
				"secondary-500": "#FFB620",
				"red": "#FF5A5A",
				"red-500": "#FF5A5A",
			},
			screens: {
				xs: "480px",
			},
			width: {
				420: "420px",
				465: "465px",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				'ibm-plex-arabic': ['IBM Plex Sans Arabic', 'sans-serif'],
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
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
