import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CSS-variable-backed colours — values swap between light & dark themes
        'bce-black':      'rgb(var(--bce-black)      / <alpha-value>)',
        'bce-surface':    'rgb(var(--bce-surface)    / <alpha-value>)',
        'bce-border':     'rgb(var(--bce-border)     / <alpha-value>)',
        'bce-gold':       'rgb(var(--bce-gold)       / <alpha-value>)',
        'bce-gold-light': 'rgb(var(--bce-gold-light) / <alpha-value>)',
        'bce-cream':      'rgb(var(--bce-cream)      / <alpha-value>)',
        'bce-muted':      'rgb(var(--bce-muted)      / <alpha-value>)',
        'bce-sage':       'rgb(var(--bce-sage)       / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-pre-bg': '#1a1a1a',
            '--tw-prose-pre-code': '#fefdfb',
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
