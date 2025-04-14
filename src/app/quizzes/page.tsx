'use client'

import { MainLayout } from '@/components/main-layout'
import { QuizFilters } from '@/components/quiz-filters'
import { QuizGrid } from '@/components/quiz-grid'
import { quizzes } from '@/data/quizzes'
import { QuizCategory, QuizDifficulty } from '@/types/quiz'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { PageTransition } from '@/components/page-transition'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animation'

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
      <PageTransition>
        <div className="container py-10 text-center">
          <motion.h1 
            className="mb-8 text-3xl font-bold tracking-tight md:text-4xl"
            variants={fadeInUp}
          >
            {filteredQuizzes.length > 0
              ? 'Available Quizzes'
              : 'No quizzes found matching your filters'}
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mb-8"
            variants={fadeInUp}
          >
            {filteredQuizzes.length > 0
              ? 'Browse our collection of quizzes and test your knowledge across various topics.'
              : 'Please try different filter criteria or view all quizzes.'}
          </motion.p>
        </div>

        <QuizFilters />

        {filteredQuizzes.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <QuizGrid quizzes={filteredQuizzes} />
          </motion.div>
        ) : (
          <motion.div 
            className="container py-16 text-center animate-fade-up"
            variants={fadeInUp}
          >
            <div className="mx-auto max-w-md">
              <h3 className="mb-4 text-xl font-semibold">No Quizzes Found</h3>
              <p className="text-muted-foreground">
                We couldn&apos;t find any quizzes matching your selected filters.
                Please try changing your filters.
              </p>
            </div>
          </motion.div>
        )}
      </PageTransition>
    </MainLayout>
  )
}
