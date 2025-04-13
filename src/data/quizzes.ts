import { Quiz } from '@/types/quiz'

export const quizzes: Quiz[] = [
  {
    id: 'science-1',
    title: 'Science Basics',
    description:
      'Test your knowledge of fundamental scientific concepts and facts',
    category: 'science',
    difficulty: 'easy',
    imageUrl: '/images/science.png',
    questions: [
      {
        id: 's1-q1',
        question: 'What is the chemical symbol for Water?',
        options: ['O2', 'CO2', 'H2O', 'NaCl'],
        correctAnswer: 2,
        explanation:
          'Water has the chemical formula H2O, representing two hydrogen atoms bonded to one oxygen atom.',
      },
      {
        id: 's1-q2',
        question: 'What planet is known as the Red Planet?',
        options: ['Jupiter', 'Mars', 'Venus', 'Saturn'],
        correctAnswer: 1,
        explanation:
          'Mars is known as the Red Planet due to the reddish appearance caused by iron oxide (rust) on its surface.',
      },
      {
        id: 's1-q3',
        question: 'What force pulls objects towards the center of the Earth?',
        options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'],
        correctAnswer: 2,
        explanation:
          'Gravity is the force that attracts objects toward the center of the Earth.',
      },
      {
        id: 's1-q4',
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Cell Membrane'],
        correctAnswer: 2,
        explanation:
          "Mitochondria are often referred to as the powerhouse of the cell because they generate most of the cell's supply of ATP, used as a source of chemical energy.",
      },
      {
        id: 's1-q5',
        question: 'What gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 2,
        explanation:
          'Plants absorb carbon dioxide from the atmosphere during photosynthesis, converting it into oxygen and glucose.',
      },
    ],
  },
  {
    id: 'history-1',
    title: 'World History Events',
    description:
      'Test your knowledge of major historical events that shaped our world',
    category: 'history',
    difficulty: 'medium',
    imageUrl: '/images/world-history.png',
    questions: [
      {
        id: 'h1-q1',
        question: 'In what year did World War I begin?',
        options: ['1905', '1914', '1923', '1939'],
        correctAnswer: 1,
        explanation:
          'World War I began in 1914 following the assassination of Archduke Franz Ferdinand of Austria.',
      },
      {
        id: 'h1-q2',
        question: 'Who was the first President of the United States?',
        options: [
          'Thomas Jefferson',
          'Abraham Lincoln',
          'George Washington',
          'John Adams',
        ],
        correctAnswer: 2,
        explanation:
          'George Washington was the first President of the United States, serving from 1789 to 1797.',
      },
      {
        id: 'h1-q3',
        question:
          'The ancient Egyptians are famous for building what structures?',
        options: ['Ziggurats', 'Aqueducts', 'Pyramids', 'Colosseums'],
        correctAnswer: 2,
        explanation:
          'The ancient Egyptians are famous for building pyramids, which served as tombs for pharaohs and their consorts.',
      },
      {
        id: 'h1-q4',
        question: 'Which empire was ruled by Julius Caesar?',
        options: [
          'Greek Empire',
          'Persian Empire',
          'Roman Empire',
          'Ottoman Empire',
        ],
        correctAnswer: 2,
        explanation:
          'Julius Caesar was a political and military leader of the Roman Republic, which later became the Roman Empire.',
      },
      {
        id: 'h1-q5',
        question:
          "The Magna Carta, signed in 1215, limited the power of which country's monarch?",
        options: ['France', 'Spain', 'England', 'Germany'],
        correctAnswer: 2,
        explanation:
          'The Magna Carta was signed by King John of England, limiting the power of the English monarchy and establishing that everyone is subject to the law.',
      },
    ],
  },
  {
    id: 'geography-1',
    title: 'World Geography',
    description:
      "Explore the world's geographic features, countries, and capitals",
    category: 'geography',
    difficulty: 'medium',
    imageUrl: '/images/geography.png',
    questions: [
      {
        id: 'g1-q1',
        question: 'What is the longest river in the world?',
        options: [
          'Amazon River',
          'Mississippi River',
          'Nile River',
          'Yangtze River',
        ],
        correctAnswer: 2,
        explanation:
          'The Nile River is the longest river in the world, stretching approximately 6,650 kilometers (4,130 miles).',
      },
      {
        id: 'g1-q2',
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 2,
        explanation:
          'Canberra is the capital city of Australia, designed specifically to be the capital as a compromise between Sydney and Melbourne.',
      },
      {
        id: 'g1-q3',
        question: 'Which is the largest desert in the world?',
        options: [
          'Sahara Desert',
          'Gobi Desert',
          'Arabian Desert',
          'Antarctic Desert',
        ],
        correctAnswer: 3,
        explanation:
          'The Antarctic Desert is the largest desert in the world, classified as a cold desert due to its low precipitation.',
      },
      {
        id: 'g1-q4',
        question:
          "Mount Everest, the world's highest peak, is located in which mountain range?",
        options: ['Andes', 'Rockies', 'Alps', 'Himalayas'],
        correctAnswer: 3,
        explanation:
          'Mount Everest is located in the Himalayan mountain range on the border between Nepal and Tibet.',
      },
      {
        id: 'g1-q5',
        question: 'What is the smallest country in the world by area?',
        options: ['Monaco', 'Nauru', 'Vatican City', 'San Marino'],
        correctAnswer: 2,
        explanation:
          'Vatican City is the smallest country in the world, with an area of approximately 44 hectares (109 acres).',
      },
    ],
  },
  {
    id: 'entertainment-1',
    title: 'Pop Culture Trivia',
    description:
      'Test your knowledge of popular movies, TV shows, music, and celebrities',
    category: 'entertainment',
    difficulty: 'easy',
    imageUrl: '/images/pop-culture.png',
    questions: [
      {
        id: 'e1-q1',
        question: 'Which artist painted the Mona Lisa?',
        options: ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Donatello'],
        correctAnswer: 2,
        explanation:
          'Leonardo da Vinci painted the Mona Lisa between 1503 and 1519. It is now displayed at the Louvre Museum in Paris.',
      },
      {
        id: 'e1-q2',
        question:
          'What is the name of the wizarding school in the Harry Potter series?',
        options: ['Beauxbatons', 'Durmstrang', 'Hogwarts', 'Ilvermorny'],
        correctAnswer: 2,
        explanation:
          'Hogwarts School of Witchcraft and Wizardry is the British wizarding school in the Harry Potter series.',
      },
      {
        id: 'e1-q3',
        question: 'Which band performed the classic song "Bohemian Rhapsody"?',
        options: ['The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd'],
        correctAnswer: 2,
        explanation:
          'Queen, led by Freddie Mercury, performed "Bohemian Rhapsody," which was released in 1975.',
      },
      {
        id: 'e1-q4',
        question:
          "In the Star Wars universe, what is the name of Han Solo's ship?",
        options: [
          'Star Destroyer',
          'X-Wing',
          'Millennium Falcon',
          'TIE Fighter',
        ],
        correctAnswer: 2,
        explanation:
          "The Millennium Falcon is Han Solo's ship in Star Wars, famous for making the Kessel Run in less than twelve parsecs.",
      },
      {
        id: 'e1-q5',
        question:
          'Which actor played Iron Man in the Marvel Cinematic Universe?',
        options: [
          'Chris Evans',
          'Chris Hemsworth',
          'Mark Ruffalo',
          'Robert Downey Jr.',
        ],
        correctAnswer: 3,
        explanation:
          'Robert Downey Jr. played Tony Stark/Iron Man in the Marvel Cinematic Universe from 2008 to 2019.',
      },
    ],
  },
  {
    id: 'literature-1',
    title: 'Literary Classics',
    description: 'Explore the world of classic literature and famous authors',
    category: 'entertainment',
    difficulty: 'medium',
    imageUrl: '/images/literature.png',
    questions: [
      {
        id: 'l1-q1',
        question: 'Who wrote "Pride and Prejudice"?',
        options: [
          'Charlotte Brontë',
          'Emily Brontë',
          'Jane Austen',
          'Mary Shelley',
        ],
        correctAnswer: 2,
        explanation:
          'Jane Austen wrote "Pride and Prejudice," which was published in 1813 and is one of the most popular novels in English literature.',
      },
      {
        id: 'l1-q2',
        question:
          'In Shakespeare\'s "Romeo and Juliet," which family does Juliet belong to?',
        options: ['Montague', 'Capulet', 'Escalus', 'Verona'],
        correctAnswer: 1,
        explanation:
          "Juliet belongs to the Capulet family, rivals of Romeo's family, the Montagues.",
      },
      {
        id: 'l1-q3',
        question: 'What is the name of the protagonist in "The Great Gatsby"?',
        options: [
          'Tom Buchanan',
          'Nick Carraway',
          'Jay Gatsby',
          'George Wilson',
        ],
        correctAnswer: 2,
        explanation:
          'Jay Gatsby is the mysterious millionaire protagonist in F. Scott Fitzgerald\'s novel "The Great Gatsby."',
      },
      {
        id: 'l1-q4',
        question:
          'Which novel features the characters Pip, Miss Havisham, and Estella?',
        options: [
          'Oliver Twist',
          'David Copperfield',
          'Great Expectations',
          'A Tale of Two Cities',
        ],
        correctAnswer: 2,
        explanation:
          '"Great Expectations" by Charles Dickens features these characters, with Pip as the protagonist.',
      },
      {
        id: 'l1-q5',
        question:
          'Who is the author of the "A Song of Ice and Fire" book series, adapted into the TV show "Game of Thrones"?',
        options: [
          'J.R.R. Tolkien',
          'George R.R. Martin',
          'C.S. Lewis',
          'J.K. Rowling',
        ],
        correctAnswer: 1,
        explanation:
          'George R.R. Martin is the author of the "A Song of Ice and Fire" fantasy series, which began with "A Game of Thrones" in 1996.',
      },
    ],
  },
  {
    id: 'music-1',
    title: 'Music Through the Ages',
    description:
      'Test your knowledge of musical genres, instruments, and famous musicians',
    category: 'entertainment',
    difficulty: 'medium',
    imageUrl: '/images/music.png',
    questions: [
      {
        id: 'm1-q1',
        question: 'Which composer is famous for the "Four Seasons"?',
        options: ['Bach', 'Mozart', 'Beethoven', 'Vivaldi'],
        correctAnswer: 3,
        explanation:
          'Antonio Vivaldi composed "The Four Seasons," a set of four violin concertos completed in 1725.',
      },
      {
        id: 'm1-q2',
        question:
          'What genre of music originated in New Orleans and features improvisation?',
        options: ['Blues', 'Jazz', 'Country', 'Rock and Roll'],
        correctAnswer: 1,
        explanation:
          'Jazz originated in New Orleans around the late 19th and early 20th centuries, characterized by improvisation and syncopation.',
      },
      {
        id: 'm1-q3',
        question: 'Which pop star is known as the "Queen of Pop"?',
        options: ['Beyoncé', 'Madonna', 'Lady Gaga', 'Taylor Swift'],
        correctAnswer: 1,
        explanation:
          'Madonna has been referred to as the "Queen of Pop" since the 1980s for her influence on the music industry.',
      },
      {
        id: 'm1-q4',
        question: 'How many strings does a standard violin have?',
        options: ['Three', 'Four', 'Five', 'Six'],
        correctAnswer: 1,
        explanation:
          'A standard violin has four strings, typically tuned to G, D, A, and E.',
      },
      {
        id: 'm1-q5',
        question: 'Which Beatle was known as "the quiet one"?',
        options: [
          'John Lennon',
          'Paul McCartney',
          'George Harrison',
          'Ringo Starr',
        ],
        correctAnswer: 2,
        explanation:
          'George Harrison was known as "the quiet Beatle" due to his more reserved personality compared to his bandmates.',
      },
    ],
  },
  {
    id: 'funfacts-1',
    title: 'Amazing Animal Facts',
    description: 'Discover fascinating facts about the animal kingdom',
    category: 'funFacts',
    difficulty: 'easy',
    imageUrl: '/images/animals.png',
    questions: [
      {
        id: 'a1-q1',
        question: 'What is the largest mammal in the world?',
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 1,
        explanation:
          'The Blue Whale is the largest mammal and the largest animal known to have ever existed, reaching lengths of up to 30 meters (98 feet).',
      },
      {
        id: 'a1-q2',
        question: 'Which bird is known for its ability to mimic human speech?',
        options: ['Eagle', 'Penguin', 'Parrot', 'Ostrich'],
        correctAnswer: 2,
        explanation:
          'Parrots are known for their ability to mimic human speech and other sounds in their environment.',
      },
      {
        id: 'a1-q3',
        question: 'What is a group of lions called?',
        options: ['Herd', 'Pack', 'Pride', 'Flock'],
        correctAnswer: 2,
        explanation:
          'A group of lions is called a pride, typically consisting of related females, their cubs, and a small number of adult males.',
      },
      {
        id: 'a1-q4',
        question: 'Which animal is the fastest land animal?',
        options: ['Lion', 'Pronghorn', 'Cheetah', 'Greyhound'],
        correctAnswer: 2,
        explanation:
          'The cheetah is the fastest land animal, capable of reaching speeds up to 70 mph (112 km/h) in short bursts.',
      },
      {
        id: 'a1-q5',
        question: 'What type of animal is a Komodo dragon?',
        options: ['Mammal', 'Bird', 'Amphibian', 'Reptile'],
        correctAnswer: 3,
        explanation:
          'The Komodo dragon is a reptile, specifically the largest living species of lizard, native to Indonesian islands.',
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
    imageUrl: '/images/technology.png',
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
        question:
          'Which company developed the first commercially successful personal computer?',
        options: ['IBM', 'Apple', 'Microsoft', 'Commodore'],
        correctAnswer: 1,
        explanation:
          'Apple released the Apple II in 1977, which is widely regarded as the first commercially successful personal computer.',
      },
      {
        id: 't1-q4',
        question: 'What year was the World Wide Web invented?',
        options: ['1983', '1989', '1991', '1995'],
        correctAnswer: 1,
        explanation:
          'Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN.',
      },
      {
        id: 't1-q5',
        question: 'Which programming language was developed first?',
        options: ['FORTRAN', 'COBOL', 'C', 'Pascal'],
        correctAnswer: 0,
        explanation:
          'FORTRAN (Formula Translation) was developed by IBM in the 1950s and is considered the first high-level programming language.',
      },
    ],
  },
]
