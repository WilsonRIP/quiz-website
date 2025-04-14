'use client'

import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@/components/ui/button'
import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { buttonTap } from '@/lib/animation'

export interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode
  withRipple?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, withRipple = false, ...props }, ref) => {
    return (
      <motion.div
        whileTap="tap"
        whileHover="hover"
        variants={buttonTap}
        className="relative"
      >
        <Button
          ref={ref}
          className={cn(
            "overflow-hidden", 
            withRipple && "animate-button-ripple", 
            className
          )}
          {...props}
        >
          <span className="relative z-10">{children}</span>
        </Button>
      </motion.div>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton' 