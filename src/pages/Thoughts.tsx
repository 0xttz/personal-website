import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

// Path to background image
const thoughtsBgUrl = 'src/assets/thoughts.png';

// Removed thoughtsData array

// Context type for type checking
interface ContextType {
  childVariants: Variants;
  HeadingStyles: {
    h1: string;
    h2: string;
    subtitle: string;
  };
  GradientStyles: {
    primary: string;
    secondary: string;
    intense: string;
    soft: string;
    card: string;
  };
}

const Thoughts: React.FC = () => {
  // Get animation variants and heading styles from layout context
  const { childVariants, HeadingStyles, GradientStyles } = useOutletContext<ContextType>();

  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layoutId="page-content"
      className="p-4 sm:p-6 md:p-8 h-full flex flex-col relative"
      style={{
        backgroundImage: `url(${thoughtsBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center calc(50%)',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={`${HeadingStyles.h1} lowercase`}>thoughts</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        I recently started putting my thoughts on technology, society and personal reflections into essays that I collect here.
      </p>
      
      {/* Placeholder container - Centered */}
      <div className="flex-grow flex items-center justify-center overflow-y-auto p-4">
        {/* Styled placeholder text */}
        <p className="text-xl md:text-2xl theme-gradient-text italic text-center max-w-lg">
          My reflections on technology, projects, and learning will be shared here soon. Stay tuned!
        </p>
      </div>
    </motion.div>
  );
};

export default Thoughts;
