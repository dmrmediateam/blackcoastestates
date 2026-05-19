import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { PostMeta } from '@/lib/posts'

interface BlogCardProps {
  post: PostMeta
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = format(new Date(post.date), 'MMM d, yyyy')

  if (featured) {
    return (
      <Link
        href={`/${post.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-2 border border-bce-border bg-bce-surface overflow-hidden hover:border-bce-gold/40 transition-all duration-300"
      >
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden min-h-[280px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bce-black/30 to-transparent" />
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-bce-gold font-medium">
              {post.category}
            </span>
            <span className="text-bce-border">·</span>
            <span className="text-xs text-bce-muted">{post.readingTime}</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-light text-bce-cream leading-tight tracking-wide mb-5 group-hover:text-bce-gold transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-bce-muted leading-relaxed mb-8 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-bce-muted">
            <span>{post.author}</span>
            <span className="text-bce-border">·</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col border border-bce-border bg-bce-surface overflow-hidden hover:border-bce-gold/40 transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bce-black/20 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[0.6rem] tracking-[0.25em] uppercase text-bce-gold font-medium">
            {post.category}
          </span>
          <span className="text-bce-border">·</span>
          <span className="text-xs text-bce-muted">{post.readingTime}</span>
        </div>
        <h3 className="font-serif text-xl font-light text-bce-cream leading-snug mb-3 group-hover:text-bce-gold transition-colors duration-200 flex-1">
          {post.title}
        </h3>
        <p className="text-sm text-bce-muted leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <time className="text-xs text-bce-muted mt-auto" dateTime={post.date}>
          {formattedDate}
        </time>
      </div>
    </Link>
  )
}
