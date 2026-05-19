import { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { generateOrganizationSchema, generateBlogSchema } from '@/lib/schema'
import BlogCard from '@/components/BlogCard'
import CategoryFilter from '@/components/CategoryFilter'
import NewsletterCTA from '@/components/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Journal — Insights on Luxury Real Estate in Costa Rica',
  description:
    'Expert guides on buying property in Costa Rica, co-ownership strategies, investment returns, and the lifestyle of Playa Negra.',
  alternates: {
    canonical: 'https://blog.blackcoastestates.com',
  },
}

interface PageProps {
  searchParams: { category?: string }
}

export default function HomePage({ searchParams }: PageProps) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const activeCategory = searchParams.category

  const filtered = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts

  const [featured, ...rest] = filtered

  const schemas = [generateOrganizationSchema(), generateBlogSchema()]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 border-b border-bce-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-[0.65rem] tracking-[0.35em] uppercase text-bce-gold mb-5 block">
                Journal
              </span>
              <h1 className="font-serif text-6xl lg:text-8xl font-light text-bce-cream tracking-wide leading-none mb-6">
                Insights<br />&amp; Stories
              </h1>
              <p className="text-bce-muted leading-relaxed text-lg max-w-md mt-6">
                Expert guides on buying property in Costa Rica, co-ownership, investment
                returns, and life in Playa Negra.
              </p>
            </div>
            {/* Quick-nav stats */}
            <div className="flex gap-10 lg:gap-14 shrink-0 pb-1">
              <div>
                <p className="font-serif text-4xl text-bce-gold font-light">{allPosts.length}</p>
                <p className="text-xs text-bce-muted mt-1 tracking-widest uppercase">Articles</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-bce-gold font-light">{categories.length}</p>
                <p className="text-xs text-bce-muted mt-1 tracking-widest uppercase">Topics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics hub */}
      {!activeCategory && (
        <section className="py-12 border-b border-bce-border">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[0.65rem] tracking-[0.35em] uppercase text-bce-muted mb-7">
              Browse by Topic
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map((cat) => {
                const slug = cat.toLowerCase().replace(/\s+/g, '-')
                const count = allPosts.filter((p) => p.category === cat).length
                const icons: Record<string, string> = {
                  'Co-Ownership': '1/2',
                  'Location': '📍',
                  'Market': '📊',
                  'Investment': '💰',
                  'Buying Guide': '📋',
                }
                return (
                  <a
                    key={cat}
                    href={`/category/${slug}`}
                    className="group border border-bce-border hover:border-bce-gold/50 bg-bce-surface hover:bg-bce-black transition-all duration-200 p-5 flex flex-col gap-3"
                  >
                    <span className="text-xs text-bce-muted group-hover:text-bce-gold transition-colors tracking-[0.2em] uppercase">
                      {cat}
                    </span>
                    <span className="font-serif text-2xl text-bce-cream/40 group-hover:text-bce-gold/50 transition-colors font-light">
                      {count}
                    </span>
                    <span className="text-[0.65rem] text-bce-muted/60 group-hover:text-bce-muted transition-colors">
                      {count === 1 ? 'article' : 'articles'} →
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filter bar */}
      <section className="py-7 border-b border-bce-border sticky top-16 z-40 bg-bce-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <CategoryFilter categories={categories} activeCategory={activeCategory} />
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="pt-12 pb-6">
          <div className="max-w-7xl mx-auto px-6">
            <BlogCard post={featured} featured />
          </div>
        </section>
      )}

      {/* Post grid */}
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

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <p className="font-serif text-2xl font-light text-bce-muted">
            No posts in this category yet.
          </p>
          <a href="/" className="mt-6 inline-block text-sm text-bce-gold hover:underline">
            View all posts →
          </a>
        </div>
      )}

      <NewsletterCTA />
    </>
  )
}
