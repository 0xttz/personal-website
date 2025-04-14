import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

// Path to background image
const thoughtsBgUrl = 'src/assets/thoughts.png';

// Updated thoughts data for list view
const thoughtsData = [
  {
    id: 1,
    title: "Memory Persistence in LLMs",
    date: "July 26, 2024",
    summary: "Exploring the challenges and potential solutions for enabling long-term memory in large language models.",
    tags: ["AI", "LLM", "Memory"],
  },
  {
    id: 2,
    title: "Vibe Coding as a Business Major",
    date: "July 25, 2024",
    summary: "How intuition and \'vibe\' play a role in coding, even from a non-traditional background.",
    tags: ["Development", "Career", "Intuition"],
  },
  // Add more thoughts here as needed
];

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
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={`${HeadingStyles.h1} lowercase`}>thoughts</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        I recently started putting my thoughts on technology, society and personal reflections into essays that I collect here.
      </p>
      
      {/* Changed from grid to flex column with spacing */}
      <div className="flex flex-col space-y-6 overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-theme-secondary/30 scrollbar-track-transparent hover:scrollbar-thumb-theme-secondary/50">
        {thoughtsData.map((thought, index) => (
          <motion.div
            key={thought.id}
            variants={childVariants}
            custom={index}
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-theme-card group"
            style={{ willChange: 'transform' }}
          >
            {/* Border overlay */}
            <div className="absolute inset-0 border border-theme rounded-lg group-hover:border-theme-hover transition-colors duration-300 pointer-events-none"></div>
            
            {/* Interactive gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            {/* Content linked to the detail page */}
            <Link to={`/thoughts/${thought.id}`} className="block w-full h-full">
              <div className="p-6">
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="text-xl font-semibold theme-gradient-text transition-all duration-500">
                    {thought.title}
                  </h2>
                  <span className="text-sm text-theme-secondary">{thought.date}</span>
                </div>
                
                <p className="text-theme-secondary mb-4">{thought.summary}</p>
                
                <div className="flex gap-2 mt-4">
                  {thought.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs bg-accent-primary/10 text-accent-primary theme-scandinavian:bg-scandi-accent-primary/10 theme-scandinavian:text-scandi-accent-primary px-2 py-1 rounded transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Thoughts;
