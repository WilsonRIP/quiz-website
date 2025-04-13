'use client'

import { useTheme } from './theme-provider'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <motion.button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 relative overflow-hidden rounded-md p-2 transition-colors"
        aria-label="Toggle theme"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'light' ? 0 : theme === 'dark' ? 180 : 90,
            scale: theme === 'system' ? 0.9 : 1,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          {theme === 'light' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
          {theme === 'dark' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          )}
          {theme === 'system' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {showTooltip && (
        <motion.div
          className="bg-card absolute top-full right-0 z-50 mt-2 origin-top-right rounded-md border px-3 py-1.5 text-xs shadow-md"
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.15 }}
        >
          {theme === 'light'
            ? 'Switch to dark mode'
            : theme === 'dark'
              ? 'Switch to system mode'
              : 'Switch to light mode'}
          <div className="bg-card absolute -top-1 right-4 h-2 w-2 rotate-45 border-t border-l" />
        </motion.div>
      )}
    </div>
  )
}
