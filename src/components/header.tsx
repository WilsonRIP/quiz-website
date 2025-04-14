'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useState, useEffect } from 'react'
import { Avatar } from './ui/avatar'
import { fetchUserProfile } from '@/lib/profile-service'
import { Profile } from '@/types/user'

export function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return

      const { profile } = await fetchUserProfile(user.id)
      if (profile) {
        setProfile(profile)
      }
    }

    if (user) {
      loadProfile()
    }
  }, [user])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/90 shadow-primary/20 flex h-8 w-8 items-center justify-center rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                className="text-primary-foreground h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-xl font-bold tracking-tight text-transparent">
              QuizMaster
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between">
          <div className="flex gap-6 md:gap-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/quizzes', label: 'Quizzes' },
              { href: '/leaderboard', label: 'Leaderboard' },
              { href: '/about', label: 'About' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium transition-colors"
              >
                <span
                  className={`${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground/60 hover:text-foreground'
                  } transition-colors`}
                >
                  {link.label}
                </span>
                <span
                  className={`bg-primary absolute -bottom-5 left-0 h-[2px] w-full scale-x-0 transform transition-transform duration-300 ${
                    pathname === link.href
                      ? 'scale-x-100'
                      : 'group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="border-border bg-background hover:bg-accent flex items-center space-x-2 rounded-full border p-1.5 focus:outline-none"
                >
                  <Avatar 
                    src={profile?.avatar_url} 
                    alt={profile?.username || user.email || 'User'} 
                    size="sm"
                    letter={user.email?.charAt(0).toUpperCase() || 'U'} 
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="bg-popover text-popover-foreground border-border absolute right-0 mt-2 w-48 rounded-md border shadow-lg"
                    onBlur={() => setIsDropdownOpen(false)}
                  >
                    <div className="p-2">
                      <div className="border-border border-b px-4 py-2 text-sm font-medium">
                        {profile?.username || user.email}
                      </div>
                      <Link
                        href="/dashboard"
                        className="hover:bg-accent block w-full px-4 py-2 text-left text-sm"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="hover:bg-accent block w-full px-4 py-2 text-left text-sm"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut()
                          setIsDropdownOpen(false)
                        }}
                        className="hover:bg-accent block w-full px-4 py-2 text-left text-sm text-red-500"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="hover:text-primary text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:outline-none"
                >
                  Sign up
                </Link>
              </div>
            )}

            <Link
              href="/quizzes"
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 hidden rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:outline-none sm:inline-flex"
            >
              Take a Quiz
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
