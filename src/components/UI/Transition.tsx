
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -8,
  },
};

export const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

export const fadeInStagger = {
  parent: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },
  child: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      }
    }
  }
};

const Transition = ({ children, className = "", delay = 0 }: TransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{
        ...pageTransition,
        delay,
      }}
      className={`h-full w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
