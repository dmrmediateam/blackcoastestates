interface CategoryFilterProps {
  categories: string[]
  activeCategory?: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const baseClass =
    'text-[0.65rem] px-4 py-2 border tracking-[0.2em] uppercase transition-colors duration-150'
  const activeClass = 'border-bce-gold bg-bce-gold text-bce-black'
  const inactiveClass =
    'border-bce-border text-bce-muted hover:border-bce-gold/60 hover:text-bce-gold'

  return (
    <div className="flex flex-wrap gap-2.5" role="navigation" aria-label="Filter by category">
      <a
        href="/"
        className={`${baseClass} ${!activeCategory ? activeClass : inactiveClass}`}
        aria-current={!activeCategory ? 'page' : undefined}
      >
        All
      </a>
      {categories.map((cat) => (
        <a
          key={cat}
          href={`/?category=${encodeURIComponent(cat)}`}
          className={`${baseClass} ${activeCategory === cat ? activeClass : inactiveClass}`}
          aria-current={activeCategory === cat ? 'page' : undefined}
        >
          {cat}
        </a>
      ))}
    </div>
  )
}
