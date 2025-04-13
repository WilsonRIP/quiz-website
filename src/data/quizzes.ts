import { Quiz } from '@/types/quiz'

export const quizzes: Quiz[] = [
  {
    id: 'history-1',
    title: 'World History Events',
    description:
      'Test your knowledge of major historical events that shaped our world',
    category: 'history',
    difficulty: 'medium',
    imageUrl: '/images/world-history.jpg',
    questions: [
      {
        id: 'h1-q1',
        question: 'In which year did World War II end?',
        options: ['1943', '1945', '1947', '1950'],
        correctAnswer: 1,
        explanation:
          'World War II ended in 1945 with the surrender of Japan after the atomic bombings of Hiroshima and Nagasaki.',
      },
      {
        id: 'h1-q2',
        question: 'Who was the first person to circumnavigate the globe?',
        options: [
          'Christopher Columbus',
          'Ferdinand Magellan',
          'James Cook',
          'Vasco da Gama',
        ],
        correctAnswer: 1,
        explanation:
          'Ferdinand Magellan led the expedition that first circumnavigated the globe, although he died before completing the journey.',
      },
      {
        id: 'h1-q3',
        question: 'The French Revolution began in which year?',
        options: ['1776', '1789', '1798', '1804'],
        correctAnswer: 1,
        explanation:
          'The French Revolution began in 1789 with the storming of the Bastille.',
      },
      {
        id: 'h1-q4',
        question:
          'Which ancient civilization built the Machu Picchu complex in Peru?',
        options: ['Maya', 'Aztec', 'Inca', 'Olmec'],
        correctAnswer: 2,
        explanation:
          'Machu Picchu was built by the Inca civilization in the 15th century.',
      },
      {
        id: 'h1-q5',
        question: 'Who was the first woman to win a Nobel Prize?',
        options: [
          'Marie Curie',
          'Rosalind Franklin',
          'Ada Lovelace',
          'Amelia Earhart',
        ],
        correctAnswer: 0,
        explanation:
          'Marie Curie was the first woman to win a Nobel Prize, receiving the Physics Prize in 1903 and the Chemistry Prize in 1911.',
      },
    ],
  },
  {
    id: 'science-1',
    title: 'Fascinating Science Facts',
    description:
      'Discover interesting facts about our universe and how science explains it',
    category: 'science',
    difficulty: 'easy',
    imageUrl: '/images/science.jpg',
    questions: [
      {
        id: 's1-q1',
        question: 'What is the most abundant element in the universe?',
        options: ['Oxygen', 'Carbon', 'Hydrogen', 'Helium'],
        correctAnswer: 2,
        explanation: 'Hydrogen makes up about 75% of the mass of the universe.',
      },
      {
        id: 's1-q2',
        question: 'Which planet has the most moons in our solar system?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswer: 1,
        explanation:
          'Saturn has at least 83 moons, with new ones still being discovered.',
      },
      {
        id: 's1-q3',
        question: 'What is the smallest unit of matter?',
        options: ['Atom', 'Electron', 'Quark', 'Molecule'],
        correctAnswer: 2,
        explanation:
          'Quarks are the smallest known particles that make up matter.',
      },
      {
        id: 's1-q4',
        question: 'What percentage of the human body is water?',
        options: ['50-60%', '60-70%', '70-80%', '80-90%'],
        correctAnswer: 1,
        explanation:
          'The human body is about 60-70% water by weight, varying with age, sex, and hydration levels.',
      },
      {
        id: 's1-q5',
        question:
          'Which animal can regenerate its entire body from just a small piece?',
        options: ['Starfish', 'Lizard', 'Hydra', 'Jellyfish'],
        correctAnswer: 2,
        explanation:
          'The hydra can regenerate its entire body from just a small fragment.',
      },
    ],
  },
  {
    id: 'funfacts-1',
    title: 'Amazing Fun Facts',
    description:
      'Test your knowledge on the most interesting and unusual facts from around the world',
    category: 'funFacts',
    difficulty: 'easy',
    imageUrl: '/images/fun-facts.jpg',
    questions: [
      {
        id: 'f1-q1',
        question: 'What is the only food that never spoils?',
        options: ['Twinkies', 'Honey', 'White rice', 'Salt'],
        correctAnswer: 1,
        explanation:
          'Honey can be preserved for thousands of years and still remain edible due to its low moisture content and acidic pH.',
      },
      {
        id: 'f1-q2',
        question: 'Which animal has fingerprints almost identical to humans?',
        options: ['Gorillas', 'Dogs', 'Koalas', 'Dolphins'],
        correctAnswer: 2,
        explanation:
          'Koalas have fingerprints so similar to humans that they have occasionally been confused at crime scenes.',
      },
      {
        id: 'f1-q3',
        question:
          'What is the only U.S. state that can be typed on just one row of a keyboard?',
        options: ['Alaska', 'Florida', 'Delaware', 'Texas'],
        correctAnswer: 0,
        explanation:
          'Alaska can be typed using just the bottom row of a standard QWERTY keyboard.',
      },
      {
        id: 'f1-q4',
        question: 'What was the first toy to be advertised on television?',
        options: ['Barbie', 'Mr. Potato Head', 'LEGO', 'Yo-yo'],
        correctAnswer: 1,
        explanation:
          'Mr. Potato Head was the first toy advertised on TV in 1952.',
      },
      {
        id: 'f1-q5',
        question: 'Which country has the most islands in the world?',
        options: ['Philippines', 'Indonesia', 'Sweden', 'Japan'],
        correctAnswer: 2,
        explanation:
          'Sweden has the most islands in the world with approximately 267,570 islands.',
      },
    ],
  },
  {
    id: 'tech-1',
    title: 'Technology Through Time',
    description:
      'From ancient inventions to modern innovations that changed our world',
    category: 'technology',
    difficulty: 'medium',
    imageUrl: '/images/technology.jpg',
    questions: [
      {
        id: 't1-q1',
        question: 'When was the first email sent?',
        options: ['1969', '1971', '1973', '1978'],
        correctAnswer: 1,
        explanation:
          'The first email was sent in 1971 by Ray Tomlinson, who implemented the @ sign to separate the user from their location.',
      },
      {
        id: 't1-q2',
        question: 'Who is considered the first computer programmer?',
        options: [
          'Alan Turing',
          'Ada Lovelace',
          'Grace Hopper',
          'Charles Babbage',
        ],
        correctAnswer: 1,
        explanation:
          "Ada Lovelace is considered the first computer programmer. She wrote an algorithm for Charles Babbage's Analytical Engine in the 1840s.",
      },
      {
        id: 't1-q3',
        question: 'In what year was the World Wide Web invented?',
        options: ['1980', '1985', '1989', '1991'],
        correctAnswer: 2,
        explanation:
          'Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.',
      },
      {
        id: 't1-q4',
        question:
          'Which company released the first smartphone with a touchscreen?',
        options: ['Apple', 'IBM', 'Nokia', 'BlackBerry'],
        correctAnswer: 1,
        explanation:
          'IBM released the Simon Personal Communicator in 1994, the first phone with touchscreen features.',
      },
      {
        id: 't1-q5',
        question:
          'What was the name of the first successful social networking site launched in 2003?',
        options: ['MySpace', 'Friendster', 'Facebook', 'LinkedIn'],
        correctAnswer: 0,
        explanation:
          'MySpace was launched in August 2003 and became the most visited website in the world by 2006.',
      },
    ],
  },
]
