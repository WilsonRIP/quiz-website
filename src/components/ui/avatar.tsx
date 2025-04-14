import { useState } from 'react'
import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  alt: string
  size?: 'sm' | 'md' | 'lg'
  letter?: string
}

export function Avatar({ src, alt, size = 'md', letter }: AvatarProps) {
  const [error, setError] = useState(false)
  
  // Size mappings
  const sizesMap = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-24 w-24 text-xl'
  }

  const sizeClass = sizesMap[size]
  
  // If we have a valid image URL and no error loading it
  if (src && !error) {
    return (
      <div className={`${sizeClass} overflow-hidden rounded-full bg-muted`}>
        <Image
          src={src}
          alt={alt}
          width={size === 'lg' ? 96 : size === 'md' ? 40 : 32}
          height={size === 'lg' ? 96 : size === 'md' ? 40 : 32}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      </div>
    )
  }
  
  // Fallback to letter avatar
  return (
    <div className={`bg-primary text-primary-foreground flex ${sizeClass} items-center justify-center rounded-full font-medium`}>
      {letter || alt.charAt(0).toUpperCase()}
    </div>
  )
} 