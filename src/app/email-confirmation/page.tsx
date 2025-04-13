import { Metadata } from 'next'
import Link from 'next/link'
import { MainLayout } from '@/components/main-layout'

export const metadata: Metadata = {
  title: 'Email Confirmation - Quiz Master',
  description: 'Please confirm your email to continue',
}

export default function EmailConfirmationPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="bg-card mx-auto w-full max-w-md rounded-lg p-6 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Check Your Email</h1>
            <p className="text-muted-foreground mt-2">
              We&apos;ve sent a confirmation link to your email address
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/30">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Please click the link in your email to confirm your account
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg border p-4">
              <h2 className="mb-3 text-lg font-medium">What happens next?</h2>
              <ul className="ml-5 list-disc space-y-2 text-sm">
                <li>Click the link in the email we just sent you</li>
                <li>Once confirmed, you&apos;ll be able to sign in</li>
                <li>
                  If you don&apos;t see the email, check your spam folder or
                  request a new confirmation email
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-muted-foreground text-center text-sm">
                Already confirmed?
              </p>
              <Link
                href="/login"
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:outline-none"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
