import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { generateLocalBusinessSchema } from '@/lib/schema'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.blackcoastestates.com'),
  title: {
    default: 'Journal | Black Coast Estates — Playa Negra, Costa Rica',
    template: '%s | Black Coast Estates',
  },
  description:
    'Insights on luxury real estate, co-ownership, and life in Playa Negra, Costa Rica. Expert guides for buyers and investors.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog.blackcoastestates.com',
    siteName: 'Black Coast Estates',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Black Coast Estates — Playa Negra, Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  other: {
    'geo.region': 'CR-G',
    'geo.placename': 'Playa Negra, Guanacaste, Costa Rica',
    'geo.position': '10.1492;-85.7234',
    'ICBM': '10.1492, -85.7234',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-bce-black text-bce-cream font-sans antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
