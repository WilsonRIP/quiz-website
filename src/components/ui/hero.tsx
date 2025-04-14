'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
  withAnimation?: boolean
}

export function Hero({
  title,
  description,
  children,
  className,
  titleClassName,
  descriptionClassName,
  contentClassName,
  withAnimation = true,
}: HeroProps) {
  const TitleComponent = withAnimation ? motion.h1 : 'h1'
  const DescriptionComponent = withAnimation ? motion.p : 'p'
  const ContentComponent = withAnimation ? motion.div : 'div'

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className={cn("space-y-6", contentClassName)}>
            <TitleComponent
              {...(withAnimation && {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 }
              })}
              className={cn(
                "text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl",
                titleClassName
              )}
            >
              {title}
            </TitleComponent>
            
            {description && (
              <DescriptionComponent
                {...(withAnimation && {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: 0.1 }
                })}
                className={cn(
                  "max-w-prose text-lg text-gray-600 dark:text-gray-300",
                  descriptionClassName
                )}
              >
                {description}
              </DescriptionComponent>
            )}
            
            {children && (
              <ContentComponent
                {...(withAnimation && {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: 0.2 }
                })}
              >
                {children}
              </ContentComponent>
            )}
          </div>
          
          <motion.div
            initial={withAnimation ? { opacity: 0 } : undefined}
            animate={withAnimation ? { opacity: 1 } : undefined}
            transition={withAnimation ? { duration: 0.5, delay: 0.2 } : undefined}
            className="relative mx-auto h-80 w-80 rounded-full bg-indigo-100 dark:bg-indigo-900/20 md:h-96 md:w-96"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-8xl">🧠</span>
              <p className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Quiz Master</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 