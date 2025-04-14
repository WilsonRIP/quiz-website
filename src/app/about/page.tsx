import { MainLayout } from '@/components/main-layout'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container py-10 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
            About QuizMaster
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">
              QuizMaster is a modern web application designed to make learning
              fun and engaging through interactive quizzes on a variety of
              topics.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to provide an entertaining way for people to test
              their knowledge, learn new facts, and challenge themselves with
              quizzes that cover real-life events, fascinating science
              discoveries, historical moments, and fun trivia.
            </p>

            <h2>Features</h2>
            <ul>
              <li>
                <strong>Diverse Quiz Topics:</strong> From history and science
                to geography and fun facts, we cover a wide range of subjects to
                keep you engaged.
              </li>
              <li>
                <strong>Multiple Difficulty Levels:</strong> Whether you&apos;re
                a beginner or an expert, we have quizzes for every knowledge
                level.
              </li>
              <li>
                <strong>Explanations:</strong> Learn from your answers with
                detailed explanations for each question.
              </li>
              <li>
                <strong>Modern Design:</strong> A clean, responsive interface
                that works on any device.
              </li>
              <li>
                <strong>Dark/Light Mode:</strong> Choose your preferred visual
                theme for comfortable quiz-taking day or night.
              </li>
            </ul>

            <h2>Get Started</h2>
            <p>
              Ready to challenge yourself? Head over to our{' '}
              <Link href="/quizzes" className="text-primary hover:underline">
                quizzes page
              </Link>{' '}
              and start testing your knowledge right away!
            </p>

            <h2>Connect With Us</h2>
            <p>
              Have suggestions for new quiz topics or feedback to share? Visit
              our GitHub page at{' '}
              <a
                href="https://github.com/WilsonRIP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                github.com/WilsonRIP
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
