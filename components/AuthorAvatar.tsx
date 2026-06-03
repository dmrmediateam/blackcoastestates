'use client'

import Image from 'next/image'
import { useState } from 'react'

interface AuthorAvatarProps {
  src: string
  name: string
  size?: number
  className?: string
}

export default function AuthorAvatar({ src, name, size = 64, className = '' }: AuthorAvatarProps) {
  const [imgError, setImgError] = useState(false)

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (imgError) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-bce-border text-bce-cream font-serif text-sm font-light tracking-widest ${className}`}
        style={{ width: size, height: size }}
        aria-label={name}
      >
        {initials}
      </div>
    )
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        sizes={`${size}px`}
        onError={() => setImgError(true)}
      />
    </div>
  )
}
