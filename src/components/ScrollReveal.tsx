import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';

const EASING = [0.16, 1, 0.3, 1] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  viewportMargin?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  xOffset = 0,
  direction = 'up',
  viewportMargin = '-40px',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  let initialY = 0;
  let initialX = 0;

  switch (direction) {
    case 'up':
      initialY = yOffset;
      break;
    case 'down':
      initialY = -yOffset;
      break;
    case 'left':
      initialX = xOffset || 24;
      break;
    case 'right':
      initialX = -(xOffset || 24);
      break;
    case 'none':
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: viewportMargin as any }}
      transition={{
        duration,
        delay,
        ease: EASING,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  viewportMargin?: string;
  once?: boolean;
}> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  viewportMargin = '-40px',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin as any }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 20 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: EASING,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * High-Impact Cinematic TextReveal Component
 * Splits text into words with upward slide + blur fade-in for clear visual reveal.
 */
export const TextReveal: React.FC<{
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  wordClassName?: string;
}> = ({
  text,
  className = '',
  as: Component = 'h2',
  delay = 0.05,
  wordClassName = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={`flex flex-wrap items-center ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 py-0.5">
          <motion.span
            initial={{ opacity: 0, y: 35, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
