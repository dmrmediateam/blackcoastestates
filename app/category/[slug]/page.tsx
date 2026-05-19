import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import NewsletterCTA from '@/components/NewsletterCTA'

interface PageProps {
  params: { slug: string }
}

// Map URL slug → display label
function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((cat) => ({
    slug: cat.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const label = slugToLabel(params.slug)
  const descriptions: Record<string, string> = {
    'co-ownership': 'Everything you need to know about co-ownership in Costa Rica — how it works, costs, scheduling, and why it beats full ownership for most buyers.',
    'location': 'Guides to Playa Negra, Guanacaste, and Costa Rica\'s top surf towns — why location matters and what each area offers property buyers.',
    'market': 'Costa Rica real estate market data, price trends, and investment analysis for buyers evaluating the Guanacaste property market.',
    'investment': 'Rental income potential, occupancy rates, and total return analysis for vacation properties in Costa Rica.',
    'buying-guide': 'Step-by-step guides for buying your first vacation home in Costa Rica — legal process, costs, financing, and management.',
  }

  return {
    title: `${label} — Costa Rica Real Estate Journal`,
    description:
      descriptions[params.slug] ??
      `Articles about ${label} from the Black Coast Estates Journal.`,
    alternates: {
      canonical: `https://blog.blackcoastestates.com/category/${params.slug}`,
    },
  }
}

export default function CategoryPage({ params }: PageProps) {
  const label = slugToLabel(params.slug)
  const allPosts = getAllPosts()
  const posts = allPosts.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, '-') === params.slug
  )

  if (posts.length === 0) notFound()

  const [featured, ...rest] = posts

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${label} — Black Coast Estates Journal`,
    url: `https://blog.blackcoastestates.com/category/${params.slug}`,
    description: `Articles about ${label} from Black Coast Estates.`,
    publisher: {
      '@type': 'Organization',
      name: 'Black Coast Estates',
      url: 'https://blackcoastestates.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="pt-40 pb-14 border-b border-bce-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-bce-muted mb-6" aria-label="Breadcrumb">
            <a href="/" className="hover:text-bce-cream transition-colors">Journal</a>
            <span>/</span>
            <span className="text-bce-gold">{label}</span>
          </nav>
          <span className="text-[0.65rem] tracking-[0.35em] uppercase text-bce-gold mb-4 block">
            Topic
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-bce-cream tracking-wide leading-none mb-4">
            {label}
          </h1>
          <p className="text-bce-muted mt-4 text-lg">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <BlogCard post={featured} featured />
        </div>
      </section>

      {/* Grid */}
      {rest.length > 0 && (
        <section className="py-6 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterCTA />
    </>
  )
}
