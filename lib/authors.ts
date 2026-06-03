export interface Author {
  slug: string
  name: string
  title: string
  bio: string
  image: string
  email?: string
  phone?: string
  location: string
  expertise: string[]
  social?: {
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

export const AUTHORS: Record<string, Author> = {
  'spencer-barber': {
    slug: 'spencer-barber',
    name: 'Spencer Barber',
    title: 'Managing Partner',
    bio: 'Spencer leads day-to-day execution of the project. His background spans acquisitions, entitlements, and full-cycle construction, including delivery of a $21.5M residential development. At Black Coast, he oversees master planning, infrastructure, construction, and investor strategy.',
    image: '/images/authors/spencer-barber.jpg',
    location: 'Playa Negra, Guanacaste, Costa Rica',
    expertise: ['Real Estate Development', 'Acquisitions', 'Construction Management', 'Investor Strategy'],
    social: {
      instagram: 'https://www.instagram.com/blackcoastestates',
      twitter: 'https://x.com/spencertbarber',
    },
  },
  'kincaid-garrett': {
    slug: 'kincaid-garrett',
    name: 'Kincaid Garrett',
    title: 'Sales Manager',
    bio: 'Kincaid leads sales for Black Coast Estates, guiding buyers through co-ownership and full ownership opportunities in Playa Negra, Costa Rica. Based in Guanacaste, he brings firsthand knowledge of the local market and a direct, no-pressure approach to every conversation.',
    image: '/images/authors/kincaid-garrett.jpg',
    email: 'kincaid@blackcoastestates.com',
    phone: '+13852513802',
    location: 'Playa Negra, Guanacaste, Costa Rica',
    expertise: ['Real Estate Sales', 'Co-Ownership Structures', 'Buyer Consultation', 'Costa Rica Market'],
    social: {
      instagram: 'https://www.instagram.com/blackcoastestates',
    },
  },
  'seth-barber': {
    slug: 'seth-barber',
    name: 'Seth Barber',
    title: 'Director of Operations',
    bio: 'Seth runs on-the-ground operations in Costa Rica. He manages construction logistics, timelines, and daily execution across the site, ensuring the project progresses as planned.',
    image: '/images/authors/seth-barber.jpg',
    location: 'Playa Negra, Guanacaste, Costa Rica',
    expertise: ['Construction Logistics', 'Site Operations', 'Project Management', 'Costa Rica Development'],
  },
  'alexandra': {
    slug: 'alexandra',
    name: 'Alexandra',
    title: 'Head of Marketing',
    bio: 'Alexandra leads marketing at Black Coast Estates and produces in-depth research on the Costa Rica real estate market. Her writing covers market analysis, investment data, and the financial fundamentals behind luxury property ownership.',
    image: '/images/authors/alexandra.jpg',
    location: 'Playa Negra, Guanacaste, Costa Rica',
    expertise: ['Market Analysis', 'Investment Research', 'Real Estate Data', 'Content Strategy'],
    social: {
      instagram: 'https://www.instagram.com/blackcoastestates',
    },
  },
}

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS[slug]
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS)
}
