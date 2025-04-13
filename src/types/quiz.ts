export type QuizCategory =
  | 'history'
  | 'science'
  | 'geography'
  | 'entertainment'
  | 'sports'
  | 'technology'
  | 'funFacts'

export type QuizDifficulty = 'easy' | 'medium' | 'hard'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: QuizCategory
  difficulty: QuizDifficulty
  questions: QuizQuestion[]
  imageUrl?: string
}

export interface QuizResult {
  quizId: string
  score: number
  totalQuestions: number
  date: string
}

export interface UserScore {
  id: string
  name: string
  score: number
}
