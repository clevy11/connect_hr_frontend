
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const fadeIn = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const fadeInDelayed = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } }
};

const PageHeader = ({ 
  title, 
  subtitle, 
  children, 
  icon,
  className = "" 
}: PageHeaderProps) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
          >
            {icon}
          </motion.div>
        )}
        <div className="space-y-1">
          <motion.h1 
            variants={fadeIn} 
            initial="initial" 
            animate="animate"
            className="text-2xl font-semibold tracking-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              variants={fadeInDelayed} 
              initial="initial" 
              animate="animate"
              className="text-sm text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
      {children && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default PageHeader;
