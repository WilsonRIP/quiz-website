import { Quiz } from '@/types/quiz'
import { QuizCard } from './quiz-card'

interface QuizGridProps {
  quizzes: Quiz[]
  title?: string
}

export function QuizGrid({ quizzes, title }: QuizGridProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        {title && (
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-3">{title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        )}
        {quizzes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground text-lg">No quizzes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
