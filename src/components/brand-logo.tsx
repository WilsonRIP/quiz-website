interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function BrandLogo({ size = 'md', showText = true }: BrandLogoProps) {
  const sizes = {
    sm: {
      container: 'h-6 w-6',
      icon: 'h-3 w-3',
      text: 'text-sm'
    },
    md: {
      container: 'h-8 w-8',
      icon: 'h-4 w-4',
      text: 'text-lg'
    },
    lg: {
      container: 'h-10 w-10',
      icon: 'h-5 w-5',
      text: 'text-xl'
    }
  };

  return (
    <div className="flex items-center">
      <div className={`mr-2 flex ${sizes[size].container} items-center justify-center rounded-full bg-primary/90`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          className={`${sizes[size].icon} text-primary-foreground`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
      </div>
      {showText && <span className={`font-bold ${sizes[size].text}`}>QuizMaster</span>}
    </div>
  );
} 