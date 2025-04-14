interface SocialIconsProps {
  size?: 'sm' | 'md' | 'lg';
  showGithub?: boolean;
}

export function SocialIcons({ size = 'md', showGithub = true }: SocialIconsProps) {
  const sizes = {
    sm: {
      container: 'h-6 w-6',
      icon: 'h-3 w-3',
    },
    md: {
      container: 'h-8 w-8',
      icon: 'h-4 w-4',
    },
    lg: {
      container: 'h-10 w-10',
      icon: 'h-5 w-5',
    }
  };

  return (
    <div className="flex space-x-3">
      {showGithub && (
        <a
          href="https://github.com/WilsonRIP"
          className={`flex ${sizes[size].container} items-center justify-center rounded-full bg-foreground/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary`}
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={sizes[size].icon}
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
      )}
    </div>
  );
} 