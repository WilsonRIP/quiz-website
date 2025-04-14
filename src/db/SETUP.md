# Supabase Setup Guide

This document provides step-by-step instructions for setting up the required Supabase resources for the quiz application.

## Prerequisites

1. A Supabase account and project
2. Your Supabase URL and anon key in `.env.local`

## Setup Steps

### 1. Create the Quiz Results Table

Execute this SQL in your Supabase SQL Editor:

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

### 2. Create the Profiles Table

Execute this SQL in your Supabase SQL Editor:

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
```

### 3. Create a Trigger for Automatic Profile Creation

This trigger will automatically create a profile when a new user signs up:

```sql
-- Create function to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS create_profile_trigger ON auth.users;
CREATE TRIGGER create_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_profile_for_user();
```

### 4. Create Profiles for Existing Users

If you already have users in your system, run this to create profiles for them:

```sql
-- Insert profiles for existing users without profiles
INSERT INTO public.profiles (id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
```

### 5. Create Storage Bucket for Avatars

1. Go to the Storage section in your Supabase dashboard
2. Click "Create a new bucket"
3. Name it "avatars"
4. Check "Make bucket public"
5. Click "Create bucket"

### 6. Create Storage Policy for Avatars

Execute this SQL to create a policy that allows users to upload their own avatars:

```sql
-- Allow users to upload their own avatars
CREATE POLICY "Users can upload their own avatars" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  auth.uid()::text = (storage.foldername(name))[1] AND
  bucket_id = 'avatars'
);

-- Allow anyone to read avatar images
CREATE POLICY "Anyone can view avatars" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'avatars'
);
```

### Troubleshooting

If you encounter errors:

1. **Database errors**: Make sure all SQL commands executed successfully
2. **Storage bucket not found**: Manually create the avatars bucket in the Supabase dashboard
3. **Missing profile records**: Run the "Create Profiles for Existing Users" query

For further assistance, consult the [Supabase documentation](https://supabase.io/docs). 