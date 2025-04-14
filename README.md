# QuizMaster - Interactive Knowledge Quizzes

A modern, interactive quiz platform built with Next.js and TypeScript. Test your knowledge with various quizzes on real-life events, science facts, history, technology, and more.

## Features

- **Diverse Quiz Categories**: Multiple quiz topics to choose from
- **Interactive Quiz Experience**: Clean and engaging quiz UI
- **Difficulty Levels**: Easy, medium, and hard quizzes
- **Explanations**: Learn from detailed explanations for each answer
- **Responsive Design**: Works great on mobile, tablet, and desktop
- **Dark/Light Mode**: Choose your preferred visual theme
- **Leaderboard**: See how you stack up against other quiz takers
- **User Authentication**: Sign up and log in with Supabase
- **Track Quiz History**: Keep a record of your quiz attempts and scores
- **Interactive Dashboard**: Analyze your quiz performance

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: For smooth animations and transitions
- **Supabase**: For user authentication and database

## Getting Started

### Prerequisites

- Node.js 18 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/quiz-website.git
cd quiz-website
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
quiz-website/
├── public/             # Static assets
│   └── images/         # Quiz images
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Home page
│   │   └── ...         # Other pages
│   ├── components/     # Reusable components
│   ├── data/           # Mock data for quizzes
│   └── types/          # TypeScript type definitions
├── package.json
└── ...
```

## Adding Your Own Quizzes

You can add your own quizzes by modifying the `src/data/quizzes.ts` file. Follow the same structure as the existing quizzes.

## Customization

- **Theme**: Modify the theme variables in `src/app/globals.css`
- **Quiz Data**: Update or add more quizzes in `src/data/quizzes.ts`
- **Styling**: Adjust the styling in component files or modify Tailwind configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Created by [WilsonRIP](https://github.com/WilsonRIP)
- Quiz questions and facts sourced from various public domain knowledge bases

## Supabase Setup

To enable quiz results tracking and user profiles, set up your Supabase database with the following tables:

### Quiz Results Table

Create a new table called `quiz_results` with the following SQL:

```sql
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
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
```

### User Profiles Table

Create a new table called `profiles` with the following SQL:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view any profile
CREATE POLICY "Anyone can view profiles" 
  ON public.profiles
  FOR SELECT 
  USING (true);

-- Allow users to update only their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.profiles
  FOR UPDATE 
  USING (auth.uid() = id);

-- Allow users to insert only their own profile
CREATE POLICY "Users can insert their own profile" 
  ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create index for username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- Create a function to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user creation
DROP TRIGGER IF EXISTS create_profile_trigger ON auth.users;
CREATE TRIGGER create_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_profile_for_user();
```

### Set Up Storage Bucket

Create a new storage bucket called `avatars` for profile pictures:

1. Go to the Storage section in your Supabase dashboard
2. Create a new bucket called `avatars`
3. Set the following bucket permissions:
   - **Public bucket**: Enable (to allow avatar images to be publicly accessible)
   - **RLS policy**: Enable
   
4. Create a policy that allows authenticated users to upload their own avatar:
   ```sql
   CREATE POLICY "Users can upload their own avatars" 
     ON storage.objects 
     FOR INSERT 
     WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
   ```

You can run these SQL commands from the Supabase SQL Editor.
