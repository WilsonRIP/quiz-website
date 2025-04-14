'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { Avatar } from './ui/avatar'
import { useAuth } from '@/context/auth-context'
import { fetchUserProfile } from '@/lib/profile-service'
import type { Profile } from '@/types/user'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/quizzes', label: 'Quizzes' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!user) return
    const loadProfile = async () => {
      const { profile } = await fetchUserProfile(user.id)
      if (profile) setProfile(profile)
    }
    loadProfile()
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border/30 dark:bg-background/80 dark:shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 shadow-md shadow-primary/20 dark:bg-primary/70 dark:shadow-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground"
              aria-hidden="true"
            >
              <path d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-indigo-600 dark:text-indigo-400">
            QuizMaster
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="group relative text-sm font-medium transition-colors"
              >
                <span
                  className={`${
                    pathname === href
                      ? 'text-primary font-semibold dark:text-primary/90'
                      : 'text-foreground/70 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground/100'
                  } transition-colors`}
                >
                  {label}
                </span>
                <span
                  className={`absolute -bottom-5 left-0 h-[2px] w-full transform scale-x-0 bg-primary transition-transform duration-300 dark:bg-primary/80 ${
                    pathname === href ? 'scale-x-100' : 'group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-2 rounded-full border border-border bg-background p-1.5 hover:bg-accent/50 focus:outline-none dark:border-border/50 dark:bg-background/80 dark:hover:bg-accent/20"
                >
                  <Avatar
                    src={profile?.avatar_url}
                    alt={profile?.username || user.email || 'User'}
                    size="sm"
                    letter={user.email?.charAt(0).toUpperCase() || 'U'}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-popover shadow-lg text-popover-foreground dark:border-border/50 dark:bg-background/95 dark:shadow-xl">
                    <div className="p-2">
                      <div className="border-b border-border px-4 py-2 text-sm font-medium dark:border-border/30">
                        {profile?.username || user.email}
                      </div>
                      <Link
                        href="/dashboard"
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-accent dark:hover:bg-accent/20"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-accent dark:hover:bg-accent/20"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut()
                          setIsDropdownOpen(false)
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-accent dark:text-red-400 dark:hover:bg-accent/20"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground/70 hover:text-primary dark:text-foreground/80 dark:hover:text-primary/90"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-primary/80 dark:hover:bg-primary/70 dark:focus:ring-primary/30"
                >
                  Sign up
                </Link>
              </div>
            )}

            <Link
              href="/quizzes"
              className="hidden rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:inline-flex dark:bg-primary/80 dark:hover:bg-primary/70 dark:focus:ring-primary/30"
            >
              Take a Quiz
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="flex items-center md:hidden p-2 rounded-md hover:bg-accent/50 dark:hover:bg-accent/20">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-foreground"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  )
}
