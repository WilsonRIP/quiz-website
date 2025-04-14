import { Variants } from 'framer-motion';

// Fade in animation with y-axis movement
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Fade in animation with slight scale
export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Staggered children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Subtle pop effect for buttons and cards
export const popIn: Variants = {
  initial: { scale: 0.97, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17 
    }
  },
  tap: { scale: 0.97 },
  hover: { scale: 1.03 }
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

// Smooth list item animations
export const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Pulse animation for notifications or highlights
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// Alert/Toast animation
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 24 
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Button press effect
export const buttonTap: Variants = {
  tap: { 
    scale: 0.97,
    transition: { 
      duration: 0.1
    }
  }
}; 