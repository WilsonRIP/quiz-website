'use client'

import { MainLayout } from '@/components/main-layout'
import { QuizPlayer } from '@/components/quiz-player'
import { quizzes } from '@/data/quizzes'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function QuizPage() {
  const { quizId } = useParams()

  const quiz = quizzes.find((q) => q.id === quizId)

  if (!quiz) {
    notFound()
  }

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {quiz.title}
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            {quiz.description}
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
              {quiz.category}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                quiz.difficulty === 'easy'
                  ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300'
                  : quiz.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300'
              }`}
            >
              {quiz.difficulty}
            </span>
            <span className="text-muted-foreground text-sm">
              {quiz.questions.length} questions
            </span>
          </div>
        </div>

        <QuizPlayer quiz={quiz} />
      </div>
    </MainLayout>
  )
}
