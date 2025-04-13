'use client'

import { QuizCategory, QuizDifficulty } from '@/types/quiz'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const categories: { value: QuizCategory; label: string }[] = [
  { value: 'history', label: 'History' },
  { value: 'science', label: 'Science' },
  { value: 'geography', label: 'Geography' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'technology', label: 'Technology' },
  { value: 'funFacts', label: 'Fun Facts' },
]

const difficulties: { value: QuizDifficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

export function QuizFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [currentCategory, setCurrentCategory] = useState<string | null>(
    searchParams.get('category')
  )
  const [currentDifficulty, setCurrentDifficulty] = useState<string | null>(
    searchParams.get('difficulty')
  )

  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null) {
      params.delete(name)
    } else {
      params.set(name, value)
    }

    return params.toString()
  }

  useEffect(() => {
    // Update URL when filters change
    if (currentCategory || currentDifficulty) {
      let query = ''

      if (currentCategory) {
        query = createQueryString('category', currentCategory)
      }

      if (currentDifficulty) {
        query = createQueryString('difficulty', currentDifficulty)
      }

      router.push(`${pathname}?${query}`)
    } else if (searchParams.toString()) {
      // If no filters but URL has params, clean URL
      router.push(pathname)
    }
  }, [currentCategory, currentDifficulty, pathname, router])

  const handleCategoryChange = (category: string) => {
    setCurrentCategory((prev) => (prev === category ? null : category))
  }

  const handleDifficultyChange = (difficulty: string) => {
    setCurrentDifficulty((prev) => (prev === difficulty ? null : difficulty))
  }

  const resetFilters = () => {
    setCurrentCategory(null)
    setCurrentDifficulty(null)
    router.push(pathname)
  }

  return (
    <div className="container mb-8">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium">Categories:</span>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                currentCategory === category.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium">Difficulty:</span>
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => handleDifficultyChange(difficulty.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                currentDifficulty === difficulty.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {difficulty.label}
            </button>
          ))}
        </div>

        {(currentCategory || currentDifficulty) && (
          <button
            onClick={resetFilters}
            className="text-primary text-sm font-medium hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  )
}
