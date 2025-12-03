import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			keyframes: {
				'accordion-down': {
				  from: { height: '0' },
				  to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
				  from: { height: 'var(--radix-accordion-content-height)' },
				  to: { height: '0' }
				},
				// 👇 Adiciona a animação fade-in
				'fade-in': {
				  from: {
					opacity: '0',
					transform: 'scale(0.95)'
				  },
				  to: {
					opacity: '1',
					transform: 'scale(1)'
				  }
				  
				}
			  },
			  animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// 👇 Registra a animação fade-in
				'fade-in': 'fade-in 0.3s ease-out'
			  },
			boxShadow: {
				neon: '0 0 20px var(--neon-green)',
				'card-urban': 'var(--shadow-card)',
				'glow': 'var(--glow-accent)'
			},
				
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Urban neon colors
				neon: {
					cyan: 'hsl(var(--neon-cyan))',
					pink: 'hsl(var(--neon-pink))',
					purple: 'hsl(var(--neon-purple))',
					green: 'hsl(var(--neon-green))'
				}
			},
			fontFamily: {
				heading: 'var(--font-heading)',
				body: 'var(--font-body)',
				sans: ['Inter', 'sans-serif']
			},
			backgroundImage: {
				'gradient-urban': 'var(--gradient-urban)',
				'gradient-hero': 'var(--gradient-hero)',
			// Removed duplicate boxShadow definition
				'glow': 'var(--glow-accent)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Removed duplicate animation property
			
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;