import { Quiz } from '@/types/quiz'
import Link from 'next/link'

interface QuizCardProps {
  quiz: Quiz
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Link
      href={`/quizzes/${quiz.id}`}
      className="bg-card text-card-foreground group hover:shadow-primary/5 flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="bg-muted relative aspect-[16/9] w-full overflow-hidden">
        {quiz.imageUrl ? (
          <>
            <div
              className="h-full w-full scale-100 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${quiz.imageUrl})` }}
              role="img"
              aria-label={quiz.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
            <div className="absolute bottom-3 left-3">
              <h3 className="text-xl font-bold text-white drop-shadow-md">
                {quiz.title}
              </h3>
            </div>
          </>
        ) : (
          <div className="bg-muted flex h-full w-full items-center justify-center">
            <span className="text-muted-foreground text-4xl font-bold">
              {quiz.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 p-5">
        {!quiz.imageUrl && (
          <h3 className="mb-2 text-xl font-bold">{quiz.title}</h3>
        )}
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {quiz.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
            <span>{quiz.questions.length} questions</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
