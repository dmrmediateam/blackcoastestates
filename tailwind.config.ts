import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bce-black': '#212121',
        'bce-surface': '#2a2a2a',
        'bce-border': '#333333',
        'bce-gold': '#c5a96a',
        'bce-gold-light': '#d4bb85',
        'bce-cream': '#fefdfb',
        'bce-muted': '#8a8a8a',
        'bce-sage': '#95a89d',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#c8c4b8',
            '--tw-prose-headings': '#fefdfb',
            '--tw-prose-links': '#c5a96a',
            '--tw-prose-bold': '#fefdfb',
            '--tw-prose-counters': '#c5a96a',
            '--tw-prose-bullets': '#c5a96a',
            '--tw-prose-hr': '#333333',
            '--tw-prose-quotes': '#c8c4b8',
            '--tw-prose-quote-borders': '#c5a96a',
            '--tw-prose-code': '#c5a96a',
            '--tw-prose-pre-code': '#fefdfb',
            '--tw-prose-pre-bg': '#2a2a2a',
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
