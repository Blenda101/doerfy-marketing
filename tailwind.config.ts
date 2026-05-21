import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F7F3EE',
        stone: '#EDE8E0',
        bone: '#E0D9CE',
        linen: '#F2EDE6',
        ink: '#1A1A2E',
        'ink-muted': '#5A5670',
        'ink-faint': '#8D8AA0',
        purple: {
          DEFAULT: '#7C5CFF',
          deep: '#5B47D9',
          light: '#A78BFA',
          pale: '#EDE6FF',
          ultra: '#F5F0FF',
        },
        manifesto: {
          DEFAULT: '#2D2A4A',
          deep: '#1E1C35',
          mid: '#3F3A6E',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
