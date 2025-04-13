'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { MainLayout } from '@/components/main-layout'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await resetPassword(email)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Password reset error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="bg-card mx-auto w-full max-w-md rounded-lg p-6 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground mt-2">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </p>
          </div>

          {isSubmitted ? (
            <div className="space-y-6">
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Check your email for a password reset link
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-input bg-background focus:border-primary focus:ring-primary w-full rounded-md border px-4 py-2 focus:ring-2 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>

              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
