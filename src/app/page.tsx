'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/main-layout'
import { Hero } from '@/components/ui/hero'

export default function Home() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Hero
          title={<>Test Your Knowledge with <span className="text-indigo-600 dark:text-indigo-400">Interactive Quizzes</span></>}
          description="Challenge yourself, learn new topics, and compete with others through our collection of engaging quizzes. Track your progress and see how you rank!"
        >
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/quizzes">
                Browse Quizzes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/profiles">View Profiles</Link>
            </Button>
          </div>
        </Hero>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="text-center">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose Our Quiz Platform?
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                title: 'Diverse Topics', 
                description: 'From science to pop culture, we have quizzes for every interest.',
                emoji: '🌎'
              },
              { 
                title: 'Track Progress', 
                description: 'Monitor your improvement with detailed statistics.',
                emoji: '📈'
              },
              { 
                title: 'Compete Globally', 
                description: 'Challenge friends and other users worldwide.',
                emoji: '🏆'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
              >
                <div className="mb-4 text-4xl">{feature.emoji}</div>
                <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 rounded-2xl bg-indigo-600 py-16 text-center text-white dark:bg-indigo-900">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to Test Your Knowledge?</h2>
            <p className="mb-8 text-lg text-indigo-100">
              Join thousands of users who are improving their skills through our quizzes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/quizzes">Start a Quiz Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white hover:bg-indigo-700 hover:text-white">
                <Link href="/leaderboard">View Leaderboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
