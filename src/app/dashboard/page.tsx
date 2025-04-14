'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { MainLayout } from '@/components/main-layout'
import { QuizResult } from '@/types/quiz'
import { quizzes } from '@/data/quizzes'
import { fetchUserQuizResults } from '@/lib/quiz-service'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)

  // Fetch quiz results using our service
  useEffect(() => {
    async function loadQuizResults() {
      if (!user) return;
      
      try {
        setIsDataLoading(true);
        const { results, error } = await fetchUserQuizResults(user.id);
        
        if (error) {
          console.error('Error loading quiz results:', error);
          return;
        }
        
        setQuizHistory(results);
      } catch (error) {
        console.error('Failed to load quiz results:', error);
      } finally {
        setIsDataLoading(false);
      }
    }
    
    if (user) {
      loadQuizResults();
    }
  }, [user]);

  // Calculate statistics
  const totalQuizzesTaken = quizHistory.length
  const totalQuestionsAnswered = quizHistory.reduce(
    (sum, quiz) => sum + quiz.totalQuestions,
    0
  )
  const totalCorrectAnswers = quizHistory.reduce(
    (sum, quiz) => sum + quiz.score,
    0
  )
  const averageScore =
    totalQuizzesTaken > 0
      ? (
          (totalCorrectAnswers / totalQuestionsAnswered) *
          100
        ).toFixed(1)
      : '0'

  // Categories breakdown
  const categoryPerformance = quizHistory.reduce((acc, result) => {
    const quiz = quizzes.find((q) => q.id === result.quizId)
    if (quiz) {
      if (!acc[quiz.category]) {
        acc[quiz.category] = {
          quizzes: 0,
          score: 0,
          total: 0,
        }
      }
      acc[quiz.category].quizzes += 1
      acc[quiz.category].score += result.score
      acc[quiz.category].total += result.totalQuestions
    }
    return acc
  }, {} as Record<string, { quizzes: number; score: number; total: number }>)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10">
          <div className="mx-auto max-w-4xl text-center">
            <p>Loading...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10 text-center">
        <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          Your Dashboard
        </h1>
        <p className="text-muted-foreground mb-12">
          Track your progress and analyze your quiz performance
        </p>

        {/* Stats Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card border-primary rounded-lg border-l-4 p-6 shadow">
            <h3 className="text-muted-foreground mb-1 text-sm font-medium">
              Quizzes Taken
            </h3>
            <p className="text-3xl font-bold">{totalQuizzesTaken}</p>
          </div>
          <div className="bg-card border-blue-500 rounded-lg border-l-4 p-6 shadow">
            <h3 className="text-muted-foreground mb-1 text-sm font-medium">
              Questions Answered
            </h3>
            <p className="text-3xl font-bold">{totalQuestionsAnswered}</p>
          </div>
          <div className="bg-card border-green-500 rounded-lg border-l-4 p-6 shadow">
            <h3 className="text-muted-foreground mb-1 text-sm font-medium">
              Correct Answers
            </h3>
            <p className="text-3xl font-bold">{totalCorrectAnswers}</p>
          </div>
          <div className="bg-card border-purple-500 rounded-lg border-l-4 p-6 shadow">
            <h3 className="text-muted-foreground mb-1 text-sm font-medium">
              Average Score
            </h3>
            <p className="text-3xl font-bold">{averageScore}%</p>
          </div>
        </div>

        {/* Category Performance */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Category Performance</h2>
          {isDataLoading ? (
            <div className="py-8">
              <p className="text-muted-foreground">Loading category data...</p>
            </div>
          ) : Object.keys(categoryPerformance).length > 0 ? (
            <div className="bg-card overflow-hidden rounded-lg border shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Category
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium">
                        Quizzes Taken
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium">
                        Score
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(categoryPerformance).map(
                      ([category, data]) => (
                        <tr
                          key={category}
                          className="hover:bg-muted/50 border-b transition-colors"
                        >
                          <td className="px-4 py-3 text-sm font-medium capitalize">
                            {category}
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            {data.quizzes}
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            {data.score} / {data.total}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center justify-center">
                              <div className="bg-muted mr-2 h-2 w-24 rounded-full">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{
                                    width: `${(data.score / data.total) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span>
                                {((data.score / data.total) * 100).toFixed(0)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg border p-6 text-center">
              <p className="text-muted-foreground">
                You haven't completed any quizzes yet. Start taking quizzes to see your performance by category.
              </p>
            </div>
          )}
        </div>

        {/* Quiz History */}
        <div>
          <h2 className="mb-6 text-2xl font-semibold">Quiz History</h2>
          {isDataLoading ? (
            <div className="py-8">
              <p className="text-muted-foreground">Loading quiz history...</p>
            </div>
          ) : quizHistory.length > 0 ? (
            <div className="bg-card overflow-hidden rounded-lg border shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        Quiz
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium">
                        Score
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizHistory.map((result) => {
                      const quiz = quizzes.find((q) => q.id === result.quizId)
                      return (
                        <tr
                          key={`${result.quizId}-${result.date}`}
                          className="hover:bg-muted/50 border-b transition-colors"
                        >
                          <td className="px-4 py-3 text-sm font-medium">
                            {quiz?.title || `Quiz ${result.quizId}`}
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            <span
                              className={`rounded-full px-2 py-1 text-xs ${
                                (result.score / result.totalQuestions) * 100 >= 70
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300'
                                  : (result.score / result.totalQuestions) * 100 >=
                                    50
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300'
                              }`}
                            >
                              {result.score} / {result.totalQuestions} (
                              {((result.score / result.totalQuestions) * 100).toFixed(
                                0
                              )}
                              %)
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            {new Date(result.date).toLocaleDateString()} at{' '}
                            {new Date(result.date).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg border p-6 text-center">
              <p className="text-muted-foreground">
                You haven't completed any quizzes yet. Go to the quizzes page to start your first quiz!
              </p>
              <div className="mt-4">
                <a 
                  href="/quizzes"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:outline-none"
                >
                  Browse Quizzes
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
} 