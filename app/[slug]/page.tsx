import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { format } from 'date-fns'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { extractToc } from '@/lib/toc'
import { generateArticleSchema, generateBreadcrumbSchema, generateFaqSchema } from '@/lib/schema'
import TableOfContents from '@/components/TableOfContents'
import StickyLeadBar from '@/components/StickyLeadBar'
import RelatedPosts from '@/components/RelatedPosts'
import NewsletterCTA from '@/components/NewsletterCTA'
import ReadingProgress from '@/components/ReadingProgress'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug)
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
        images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage],
      },
      alternates: {
        canonical: `https://blog.blackcoastestates.com/${post.slug}`,
      },
    }
  } catch {
    return {}
  }
}

export default function BlogPostPage({ params }: PageProps) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const toc = extractToc(post.content)
  const relatedPosts = getRelatedPosts(post.slug, post.category)
  const faqSchema = generateFaqSchema(post)
  const schemas = [
    generateArticleSchema(post),
    generateBreadcrumbSchema(post),
    ...(faqSchema ? [faqSchema] : []),
  ]

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <article>
        {/* Post header */}
        <header className="pt-36 pb-12 border-b border-bce-border">
          <div className="max-w-4xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-bce-muted mb-8" aria-label="Breadcrumb">
              <a href="https://blackcoastestates.com" className="hover:text-bce-cream transition-colors">
                Black Coast Estates
              </a>
              <span aria-hidden="true">/</span>
              <a href="/" className="hover:text-bce-cream transition-colors">
                Journal
              </a>
              <span aria-hidden="true">/</span>
              <a
                href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-bce-gold hover:text-bce-gold-light transition-colors"
              >
                {post.category}
              </a>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <a
                href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[0.65rem] tracking-[0.25em] uppercase text-bce-gold font-medium hover:text-bce-gold-light transition-colors"
              >
                {post.category}
              </a>
              <span className="text-bce-border" aria-hidden="true">·</span>
              <span className="text-xs text-bce-muted">{post.readingTime}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide text-bce-cream mb-7">
              {post.title}
            </h1>

            <p className="text-xl text-bce-cream/65 leading-relaxed max-w-2xl mb-10">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 text-sm text-bce-muted pb-0">
              <span className="text-bce-cream/70">{post.author}</span>
              <span className="text-bce-border">·</span>
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </div>

        {/* Content + TOC */}
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-12 xl:gap-16 items-start">

            {/* Main content */}
            <div className="min-w-0">
              {/* Mobile TOC */}
              <TableOfContents items={toc} mobile />

              <div className="prose-bce">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug],
                    },
                  }}
                />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-bce-border flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] px-3 py-1.5 border border-bce-border text-bce-muted tracking-[0.2em] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <a href="/" className="text-sm text-bce-gold hover:text-bce-gold-light transition-colors">
                  ← Back to Journal
                </a>
              </div>
            </div>

            {/* Desktop TOC sidebar */}
            <aside className="hidden xl:block">
              <TableOfContents items={toc} />
            </aside>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      <NewsletterCTA />
      <StickyLeadBar category={post.category} />
    </>
  )
}
