import Link from 'next/link'
import { MainLayout } from '@/components/main-layout'

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">404 - Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The resource you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
          >
            Go Home
          </Link>
          <Link
            href="/quizzes"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium"
          >
            Browse Quizzes
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
