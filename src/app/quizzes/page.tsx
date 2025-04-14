'use client'

import { MainLayout } from '@/components/main-layout'
import { QuizFilters } from '@/components/quiz-filters'
import { QuizGrid } from '@/components/quiz-grid'
import { quizzes } from '@/data/quizzes'
import { QuizCategory, QuizDifficulty } from '@/types/quiz'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function QuizzesPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') as QuizCategory | null
  const difficultyParam = searchParams.get(
    'difficulty'
  ) as QuizDifficulty | null

  const filteredQuizzes = useMemo(() => {
    let filtered = quizzes

    if (categoryParam) {
      filtered = filtered.filter((quiz) => quiz.category === categoryParam)
    }

    if (difficultyParam) {
      filtered = filtered.filter((quiz) => quiz.difficulty === difficultyParam)
    }

    return filtered
  }, [categoryParam, difficultyParam])

  return (
    <MainLayout>
      <div className="container py-10 text-center">
        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          {filteredQuizzes.length > 0
            ? 'Available Quizzes'
            : 'No quizzes found matching your filters'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {filteredQuizzes.length > 0
            ? 'Browse our collection of quizzes and test your knowledge across various topics.'
            : 'Please try different filter criteria or view all quizzes.'}
        </p>
      </div>

      <QuizFilters />

      {filteredQuizzes.length > 0 ? (
        <QuizGrid quizzes={filteredQuizzes} />
      ) : (
        <div className="container py-16 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="mb-4 text-xl font-semibold">No Quizzes Found</h3>
            <p className="text-muted-foreground">
              We couldn&apos;t find any quizzes matching your selected filters.
              Please try changing your filters.
            </p>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
