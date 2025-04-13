import { Quiz } from '@/types/quiz'
import { QuizCard } from './quiz-card'

interface QuizGridProps {
  quizzes: Quiz[]
  title?: string
}

export function QuizGrid({ quizzes, title }: QuizGridProps) {
  return (
    <div className="container py-8">
      {title && (
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}
