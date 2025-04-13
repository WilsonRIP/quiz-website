'use client'

import { MainLayout } from '@/components/main-layout'
import { QuizGrid } from '@/components/quiz-grid'
import { quizzes } from '@/data/quizzes'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  // Get the first 4 quizzes to display on the homepage
  const featuredQuizzes = quizzes.slice(0, 4)

  return (
    <MainLayout>
      <section className="relative overflow-hidden py-24">
        {/* Background gradient */}
        <div className="from-primary/10 via-background to-background absolute inset-0 -z-10 bg-gradient-to-br" />
        <div className="bg-grid-primary/5 absolute top-0 right-0 left-0 -z-10 h-48" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="from-primary to-accent mb-6 bg-gradient-to-r bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Challenge Your Knowledge
            </h1>
            <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-xl">
              Test yourself with fun quizzes on real-life events, science facts,
              history, technology and more.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/quizzes"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 inline-flex items-center justify-center rounded-md px-6 py-3 font-medium shadow-lg transition-colors"
              >
                Start a Quiz
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="ml-2 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/about"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <div className="mt-16 flex items-center justify-center">
            <motion.div
              className="bg-primary/10 border-primary/20 shadow-primary/5 flex items-center justify-center rounded-full border p-3 shadow-lg"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-primary h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 relative py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-14 text-center text-3xl font-bold tracking-tight">
            Why Play Our Quizzes?
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: 'Learn While Having Fun',
                description:
                  'Discover fascinating facts and expand your knowledge in an entertaining way.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                ),
              },
              {
                title: 'Challenge Yourself',
                description:
                  'Test your knowledge across various topics and difficulty levels.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                ),
              },
              {
                title: 'Compete & Share',
                description:
                  'Compare your scores with friends and challenge them to beat your record.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                  />
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-primary text-primary-foreground shadow-primary/20 mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-10 w-10"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <QuizGrid quizzes={featuredQuizzes} title="Featured Quizzes" />
      </motion.div>
    </MainLayout>
  )
}
