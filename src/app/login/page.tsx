import { Metadata } from 'next'
import LoginForm from '@/components/auth/login-form'
import { MainLayout } from '@/components/main-layout'

export const metadata: Metadata = {
  title: 'Login - Quiz Master',
  description: 'Login to your Quiz Master account',
}

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
          <LoginForm />
        </div>
      </div>
    </MainLayout>
  )
}
