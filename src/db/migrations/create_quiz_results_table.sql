-- Create quiz_results table
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Enable RLS
  CONSTRAINT valid_score CHECK (score >= 0 AND score <= total_questions)
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view only their own quiz results
CREATE POLICY "Users can view their own quiz results" 
  ON public.quiz_results
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow users to insert their own quiz results
CREATE POLICY "Users can insert their own quiz results" 
  ON public.quiz_results
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_id ON public.quiz_results(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON public.quiz_results(created_at DESC);

-- Add comment to table
COMMENT ON TABLE public.quiz_results IS 'Stores quiz results for users'; 