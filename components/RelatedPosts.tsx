import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { PostMeta } from '@/lib/posts'

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="border-t border-bce-border bg-bce-surface py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-light tracking-wide text-bce-cream mb-10">
          More From the Journal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border border-bce-border hover:border-bce-gold/40 transition-all duration-300 overflow-hidden bg-bce-black"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <span className="text-[0.6rem] text-bce-gold tracking-[0.25em] uppercase">
                  {post.category}
                </span>
                <h3 className="font-serif text-lg font-light text-bce-cream mt-2 mb-2 leading-snug group-hover:text-bce-gold transition-colors duration-200">
                  {post.title}
                </h3>
                <time className="text-xs text-bce-muted" dateTime={post.date}>
                  {format(new Date(post.date), 'MMM d, yyyy')}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
