'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'quiz-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      root.classList.add(prefersDark ? 'dark' : 'light')
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') return 'dark'
      if (prevTheme === 'dark') return 'system'
      return 'light'
    })
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
