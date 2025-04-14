import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { QuizResult } from '@/types/quiz'

/**
 * Saves a quiz result to Supabase
 */
export async function saveQuizResult(
  userId: string, 
  quizId: string, 
  score: number, 
  totalQuestions: number
): Promise<{ success: boolean; error: any }> {
  try {
    const supabase = createClientComponentClient()
    
    const { error } = await supabase
      .from('quiz_results')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        score,
        total_questions: totalQuestions
      })
    
    if (error) {
      console.error('Error saving quiz result:', error)
      return { success: false, error }
    }
    
    return { success: true, error: null }
  } catch (error) {
    console.error('Failed to save quiz result:', error)
    return { success: false, error }
  }
}

/**
 * Fetches quiz results for a specific user
 */
export async function fetchUserQuizResults(userId: string): Promise<{ results: QuizResult[]; error: any }> {
  try {
    const supabase = createClientComponentClient()
    
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching quiz results:', error)
      return { results: [], error }
    }
    
    // Transform the data to match our QuizResult type
    const formattedResults: QuizResult[] = data.map(result => ({
      quizId: result.quiz_id,
      score: result.score,
      totalQuestions: result.total_questions,
      date: result.created_at
    }))
    
    return { results: formattedResults, error: null }
  } catch (error) {
    console.error('Failed to fetch quiz results:', error)
    return { results: [], error }
  }
} 