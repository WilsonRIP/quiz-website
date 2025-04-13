import { Metadata } from 'next'
import SignupForm from '@/components/auth/signup-form'
import { MainLayout } from '@/components/main-layout'

export const metadata: Metadata = {
  title: 'Sign Up - Quiz Master',
  description: 'Create a new Quiz Master account',
}

export default function SignupPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-center text-2xl font-bold">Sign Up</h1>
          <SignupForm />
        </div>
      </div>
    </MainLayout>
  )
}
