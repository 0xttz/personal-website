import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Enhanced thoughts data with size information
const thoughtsData = [
  {
    id: 1,
    title: "On Building Products People Love",
    date: "April 15, 2024",
    summary: "Reflecting on the principles that guide exceptional product development - user-centered design, iterative processes, and finding the right balance between innovation and familiarity.",
    tags: ["Product Design", "UX"],
    size: "wide", // wide tile
  },
  {
    id: 2,
    title: "The Evolution of Frontend Development",
    date: "March 28, 2024",
    summary: "Tracking the significant shifts in frontend development from jQuery to modern frameworks, and exploring where we might be headed next.",
    tags: ["Frontend", "Web Development"],
    size: "normal", // normal tile
  },
  {
    id: 3,
    title: "AI Tools in My Daily Workflow",
    date: "March 10, 2024",
    summary: "How I've incorporated various AI tools into my creative and development processes, and the impact they've had on productivity and creativity.",
    tags: ["AI", "Productivity"],
    size: "normal", // normal tile
  },
  {
    id: 4,
    title: "Visual Inspiration",
    date: "February 20, 2024",
    summary: "",
    tags: [],
    size: "normal",
    visualOnly: true
  }
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
}

const Thoughts: React.FC = () => {
  // Get animation variants and heading styles from layout context
  const { childVariants, HeadingStyles } = useOutletContext<ContextType>();

  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col h-full"
    >
      <h1 className={HeadingStyles.h1}>Thoughts</h1>
      <p className={`mt-6 mb-10 ${HeadingStyles.subtitle}`}>
        A collection of essays and reflections on technology, design, and the digital landscape.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {thoughtsData.map((thought, index) => (
          <motion.article 
            key={thought.id}
            variants={childVariants}
            custom={index}
            className={`${getArticleClasses(thought.size)} rounded-lg overflow-hidden border border-accent-primary/10 shadow-md hover:shadow-lg transition-all`}
          >
            {thought.visualOnly ? (
              // Visual-only content
              <div className="h-full min-h-[240px] bg-gradient-to-tr from-accent-primary/20 via-accent-primary/5 to-accent-secondary/20 flex items-center justify-center p-6">
                <p className="text-text-primary/50 italic text-center">[ Midjourney - Abstract Design Process Visual ]</p>
              </div>
            ) : (
              // Regular thought content
              <div className="p-6 bg-background">
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="text-xl font-semibold text-text-primary hover:text-accent-secondary transition-colors">
                    <a href={`#thought-${thought.id}`}>
                      {thought.title}
                    </a>
                  </h2>
                  <span className="text-sm text-text-secondary">{thought.date}</span>
                </div>
                
                {thought.size === 'wide' && (
                  <div className="float-right ml-6 mb-4 w-1/3 h-32 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-lg flex items-center justify-center">
                    <p className="text-text-primary/40 italic text-center text-sm">[ Concept Visual ]</p>
                  </div>
                )}
                
                <p className="text-text-secondary mb-4">{thought.summary}</p>
                
                <div className="flex gap-2 mt-4">
                  {thought.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs bg-accent-primary/10 text-accent-primary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default Thoughts;
