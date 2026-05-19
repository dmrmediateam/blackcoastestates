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
        'bce-black': '#080808',
        'bce-surface': '#111111',
        'bce-border': '#1e1e1e',
        'bce-gold': '#c9a870',
        'bce-gold-light': '#d9bc8d',
        'bce-cream': '#f0ebe0',
        'bce-muted': '#9e9a93',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#c8c3b8',
            '--tw-prose-headings': '#f0ebe0',
            '--tw-prose-links': '#c9a870',
            '--tw-prose-bold': '#f0ebe0',
            '--tw-prose-counters': '#c9a870',
            '--tw-prose-bullets': '#c9a870',
            '--tw-prose-hr': '#1e1e1e',
            '--tw-prose-quotes': '#c8c3b8',
            '--tw-prose-quote-borders': '#c9a870',
            '--tw-prose-code': '#c9a870',
            '--tw-prose-pre-code': '#f0ebe0',
            '--tw-prose-pre-bg': '#111111',
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
