'use client'

import { Header } from './header'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Created by{' '}
            <a
              href="https://github.com/WilsonRIP"
              className="text-primary hover:underline"
            >
              WilsonRIP
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
