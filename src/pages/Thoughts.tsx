import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';

// Updated thoughts data
const thoughtsData = [
  {
    id: 1, // Re-using ID for simplicity, ensure uniqueness if necessary
    title: "Memory Persistence in LLMs",
    date: "July 26, 2024", // Placeholder date
    summary: "Exploring the challenges and potential solutions for enabling long-term memory in large language models.",
    tags: ["AI", "LLM", "Memory"],
    size: "wide",
  },
  {
    id: 2, // Re-using ID
    title: "Vibe Coding as a Business Major",
    date: "July 25, 2024", // Placeholder date
    summary: "How intuition and 'vibe' play a role in coding, even from a non-traditional background.",
    tags: ["Development", "Career", "Intuition"],
    size: "normal",
  },
  {
    id: 3, // Re-using ID
    title: "Conceptual Illustration",
    date: "July 24, 2024", // Placeholder date
    summary: "", // No summary for visual
    tags: [],
    size: "normal",
    visualOnly: true // Mark as visual placeholder
  }
  // Add more thoughts here as needed
];

// Helper function to get classes based on article size
const getArticleClasses = (size: string) => {
  switch (size) {
    case 'wide':
      return 'md:col-span-2';
    case 'tall':
      return 'md:row-span-2';
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'normal':
    default:
      return '';
  }
};

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
      className="h-full flex flex-col"
      layoutId="page-content" // Ensure layout stability
    >
      <h1 className={HeadingStyles.h1}>Thoughts</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        A collection of essays and reflections on technology, design, and the digital landscape.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow auto-rows-fr">
        {thoughtsData.map((thought, index) => (
          <Link to={thought.visualOnly ? '#' : `/thoughts/${thought.id}`} key={thought.id} className={`${getArticleClasses(thought.size)}`}>
            <motion.article 
              variants={childVariants}
              custom={index}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full card-enhanced"
              style={{ willChange: 'transform' }} // Performance hint
            >
              {/* Border gradient */}
              <div className="absolute inset-0 border border-theme rounded-lg group-hover:border-theme-hover transition-colors duration-300"></div>
              
              {thought.visualOnly ? (
                // Visual-only content with more subtle gradient
                <div className="h-full min-h-[240px] bg-theme-card bg-opacity-80 bg-gradient-to-tr from-accent-primary/10 to-accent-secondary/20 theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/20 flex items-center justify-center p-6">
                  <p className="text-theme-primary/50 italic text-center">[ Midjourney - Abstract Design Process Visual ]</p>
                </div>
              ) : (
                // Regular thought content
                <div className="p-4 bg-theme-background">
                  <div className="flex justify-between items-baseline mb-4">
                    <Link to={`/thoughts/${thought.id}`} className="block">
                      <h2 className="text-xl font-semibold theme-gradient-text transition-all duration-500">
                        {thought.title}
                      </h2>
                    </Link>
                    <span className="text-sm text-theme-secondary">{thought.date}</span>
                  </div>
                  
                  {thought.size === 'wide' && (
                    <div className="float-right ml-6 mb-4 w-1/3 h-32 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/10 theme-scandinavian:from-scandi-accent-primary/5 theme-scandinavian:to-scandi-accent-secondary/10 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                      <p className="text-theme-primary/40 italic text-center text-sm">[ Concept Visual ]</p>
                    </div>
                  )}
                  
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
                  
                  {/* Read more indicator */}
                  <div className="mt-4 flex justify-end">
                    <Link to={`/thoughts/${thought.id}`}>
                      <motion.div 
                        className="flex items-center text-sm text-accent-primary theme-scandinavian:text-scandi-accent-primary"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="mr-1">Read more</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Hover gradient overlay - more subtle */}
              <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-accent-primary/3 to-accent-secondary/3 theme-scandinavian:from-scandi-accent-primary/3 theme-scandinavian:to-scandi-accent-secondary/3 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.article>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Thoughts;
