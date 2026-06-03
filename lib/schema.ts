import { Post } from './posts'
import { Author, getAuthor } from './authors'
import { extractFaqs } from './toc'

export function generatePersonSchema(author: Author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    image: `https://blog.blackcoastestates.com${author.image}`,
    url: `https://blog.blackcoastestates.com/author/${author.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'Black Coast Estates',
      url: 'https://blackcoastestates.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Playa Negra',
      addressRegion: 'Guanacaste',
      addressCountry: 'CR',
    },
    knowsAbout: author.expertise,
    ...(author.email ? { email: author.email } : {}),
    ...(author.phone ? { telephone: author.phone } : {}),
    ...(author.social && Object.values(author.social).filter(Boolean).length > 0
      ? { sameAs: Object.values(author.social).filter(Boolean) }
      : {}),
  }
}

export function generateArticleSchema(post: Post) {
  const author = post.authorSlug ? getAuthor(post.authorSlug) : undefined

  const authorSchema = author
    ? {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.title,
        url: `https://blog.blackcoastestates.com/author/${author.slug}`,
      }
    : {
        '@type': 'Organization',
        name: 'Black Coast Estates',
        url: 'https://blackcoastestates.com',
      }

  const wordCount = post.content.trim().split(/\s+/).length

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    inLanguage: 'en-US',
    articleSection: post.category,
    wordCount,
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      name: 'Black Coast Estates',
      url: 'https://blackcoastestates.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blackcoastestates.com/favicon.ico',
      },
      sameAs: [
        'https://www.instagram.com/blackcoastestates',
        'https://blackcoastestates.com',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://blog.blackcoastestates.com/blog/${post.slug}`,
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'Black Coast Estates Journal',
      url: 'https://blog.blackcoastestates.com',
    },
    keywords: post.tags.join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      xpath: ['/html/head/title', '//h1'],
    },
  }
}

export function generateBreadcrumbSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Black Coast Estates',
        item: 'https://blackcoastestates.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Journal',
        item: 'https://blog.blackcoastestates.com',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://blog.blackcoastestates.com/blog/${post.slug}`,
      },
    ],
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Black Coast Estates',
    url: 'https://blackcoastestates.com',
    logo: 'https://blackcoastestates.com/favicon.ico',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+14355130074',
      contactType: 'sales',
      email: 'info@blackcoastestates.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Playa Negra',
      addressRegion: 'Guanacaste',
      addressCountry: 'CR',
    },
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    name: 'Black Coast Estates',
    url: 'https://blackcoastestates.com',
    telephone: '+14355130074',
    email: 'info@blackcoastestates.com',
    priceRange: '$$$$',
    description:
      'Luxury co-ownership and full ownership real estate in Playa Negra, Guanacaste, Costa Rica. Fractional shares from $100K. Turnkey vacation homes with managed rental income.',
    image: 'https://blackcoastestates.com/favicon.ico',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Playa Negra',
      addressLocality: 'Santa Cruz',
      addressRegion: 'Guanacaste',
      postalCode: '50305',
      addressCountry: 'CR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.1492,
      longitude: -85.7234,
    },
    areaServed: [
      { '@type': 'Place', name: 'Playa Negra, Costa Rica' },
      { '@type': 'Place', name: 'Guanacaste, Costa Rica' },
      { '@type': 'Place', name: 'Costa Rica' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Properties',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Co-Ownership Share',
            description: 'Fractional co-ownership of a luxury vacation home in Playa Negra',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: 100000,
            priceCurrency: 'USD',
          },
        },
      ],
    },
    sameAs: [
      'https://blackcoastestates.com',
      'https://blog.blackcoastestates.com',
    ],
  }
}

export function generateFaqSchema(post: Post) {
  const faqs = extractFaqs(post.content)
  if (faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}

export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Black Coast Estates Journal',
    url: 'https://blog.blackcoastestates.com',
    description:
      'Insights on luxury real estate, co-ownership, and life in Playa Negra, Costa Rica.',
    publisher: {
      '@type': 'Organization',
      name: 'Black Coast Estates',
      url: 'https://blackcoastestates.com',
    },
  }
}
