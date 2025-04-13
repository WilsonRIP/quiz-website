# QuizMaster - Interactive Knowledge Quizzes

A modern, interactive quiz platform built with Next.js and TypeScript. Test your knowledge with various quizzes on real-life events, science facts, history, technology, and more.

## Features

- **Diverse Quiz Categories**: Multiple quiz topics to choose from
- **Interactive Quiz Experience**: Clean and engaging quiz UI
- **Difficulty Levels**: Easy, medium, and hard quizzes
- **Explanations**: Learn from detailed explanations for each answer
- **Responsive Design**: Works great on mobile, tablet, and desktop
- **Dark/Light Mode**: Choose your preferred visual theme
- **Leaderboard**: See how you stack up against other quiz takers

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: For smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/quiz-website.git
cd quiz-website
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
quiz-website/
├── public/             # Static assets
│   └── images/         # Quiz images
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Home page
│   │   └── ...         # Other pages
│   ├── components/     # Reusable components
│   ├── data/           # Mock data for quizzes
│   └── types/          # TypeScript type definitions
├── package.json
└── ...
```

## Adding Your Own Quizzes

You can add your own quizzes by modifying the `src/data/quizzes.ts` file. Follow the same structure as the existing quizzes.

## Customization

- **Theme**: Modify the theme variables in `src/app/globals.css`
- **Quiz Data**: Update or add more quizzes in `src/data/quizzes.ts`
- **Styling**: Adjust the styling in component files or modify Tailwind configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Created by [WilsonRIP](https://github.com/WilsonRIP)
- Quiz questions and facts sourced from various public domain knowledge bases
