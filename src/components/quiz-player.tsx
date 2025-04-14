'use client'

import { Quiz } from '@/types/quiz'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/auth-context'
import { saveQuizResult } from '@/lib/quiz-service'

// Add type definition for the confetti function
declare global {
  interface Window {
    confetti?: (options?: {
      particleCount?: number
      spread?: number
      origin?: { y: number; x?: number }
      colors?: string[]
      disableForReducedMotion?: boolean
      zIndex?: number
      scalar?: number
      startVelocity?: number
      ticks?: number
      shapes?: string[]
      [key: string]: unknown
    }) => void
  }
}

interface QuizPlayerProps {
  quiz: Quiz
}

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(quiz.questions.length).fill(-1)
  )
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [animatingAnswer, setAnimatingAnswer] = useState(false)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const totalQuestions = quiz.questions.length
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1
  const isAnswered = selectedAnswers[currentQuestionIndex] !== -1
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleSelectAnswer = (answerIndex: number) => {
    if (isAnswered || animatingAnswer) return

    setAnimatingAnswer(true)

    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newSelectedAnswers)

    // Update score if answer is correct
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    // Add slight delay before allowing next question
    setTimeout(() => {
      setAnimatingAnswer(false)
    }, 500)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
      // Save quiz result to Supabase when completing the quiz
      if (user) {
        saveQuizResult(
          user.id,
          quiz.id,
          score,
          totalQuestions
        ).then(({ success, error }) => {
          if (success) {
            console.log('Quiz result saved successfully')
          } else {
            console.error('Failed to save quiz result:', error)
          }
        })
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowExplanation(false)
    }
  }

  const handleViewExplanation = () => {
    setShowExplanation(true)
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers(Array(quiz.questions.length).fill(-1))
    setShowExplanation(false)
    setQuizCompleted(false)
    setScore(0)
  }

  const handleGoToQuizzes = () => {
    router.push('/quizzes')
  }

  // Confetti effect for perfect scores
  useEffect(() => {
    if (quizCompleted && score === totalQuestions) {
      const confettiScript = document.createElement('script')
      confettiScript.src =
        'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js'
      confettiScript.onload = () => {
        window.confetti?.({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
      document.body.appendChild(confettiScript)

      return () => {
        document.body.removeChild(confettiScript)
      }
    }
  }, [quizCompleted, score, totalQuestions])

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card mx-auto max-w-2xl overflow-hidden rounded-lg border shadow-sm"
      >
        <div className="space-y-6 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-muted-foreground mt-2">
              You scored {score} out of {totalQuestions} questions correctly.
            </p>

            <div className="my-8">
              <div className="bg-secondary relative h-4 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${(score / totalQuestions) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>
                  {Math.round((score / totalQuestions) * 100)}% accuracy
                </span>
                <span
                  className={
                    score === totalQuestions ? 'text-primary font-medium' : ''
                  }
                >
                  {score === totalQuestions
                    ? 'Perfect score!'
                    : score === 0
                      ? 'Better luck next time!'
                      : 'Good effort!'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleRetakeQuiz}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={handleGoToQuizzes}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                More Quizzes
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="bg-secondary mb-4 h-2 w-full overflow-hidden rounded-full">
        <motion.div
          className="bg-primary h-full"
          initial={{
            width: `${(currentQuestionIndex / totalQuestions) * 100}%`,
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="bg-card overflow-hidden rounded-lg border shadow-sm">
        <div className="space-y-6 p-6">
          <div className="flex justify-between">
            <p className="text-muted-foreground text-sm font-medium">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            <p className="text-muted-foreground text-sm font-medium">
              Score: {score}/{totalQuestions}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold">{currentQuestion.question}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full rounded-md border p-3 text-left transition-all ${
                      isAnswered
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                          : index === selectedAnswers[currentQuestionIndex]
                            ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                            : 'border-transparent opacity-60'
                        : 'border-border hover:bg-muted hover:border-primary/20'
                    }`}
                    whileHover={!isAnswered ? { scale: 1.01 } : {}}
                    whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                          isAnswered && index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                            : isAnswered &&
                                index === selectedAnswers[currentQuestionIndex]
                              ? 'border-red-500 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                              : 'border-muted-foreground/20'
                        }`}
                      >
                        {isAnswered &&
                          index === currentQuestion.correctAnswer && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        {isAnswered &&
                          index === selectedAnswers[currentQuestionIndex] &&
                          index !== currentQuestion.correctAnswer && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                          )}
                        {(!isAnswered ||
                          (isAnswered &&
                            index !== currentQuestion.correctAnswer &&
                            index !==
                              selectedAnswers[currentQuestionIndex])) && (
                          <span className="text-muted-foreground text-xs">
                            {String.fromCharCode(65 + index)}
                          </span>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {isAnswered && !showExplanation && currentQuestion.explanation && (
            <motion.button
              onClick={handleViewExplanation}
              className="text-primary flex items-center text-sm hover:underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-1 h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.252 9H9Z"
                  clipRule="evenodd"
                />
              </svg>
              View Explanation
            </motion.button>
          )}

          <AnimatePresence>
            {showExplanation && currentQuestion.explanation && (
              <motion.div
                className="bg-secondary rounded-md p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {isAnswered && (
            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={handleNextQuestion}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center rounded-md px-5 py-2 text-sm font-medium transition-colors"
              >
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-2 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
