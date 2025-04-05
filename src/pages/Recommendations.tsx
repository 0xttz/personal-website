import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Enhanced recommendations data with size and visual information
const recommendationsData = [
  { 
    id: 1, 
    type: 'Video', 
    title: 'Karpathy - Intro to LLMs', 
    link: '#', 
    note: 'Excellent foundational overview of large language models, covering architecture and training fundamentals.',
    size: 'medium' 
  },
  { 
    id: 2, 
    type: 'Video', 
    title: 'Veritasium - Relativity', 
    link: '#', 
    note: 'Makes complex physics accessible through excellent visualizations and clear explanations.',
    size: 'small' 
  },
  { 
    id: 3, 
    type: 'Book', 
    title: 'Book Title 1', 
    link: '#', 
    note: 'Brief thought on why it\'s recommended.',
    size: 'small' 
  },
  { 
    id: 4, 
    type: 'Book', 
    title: 'Book Title 2', 
    link: '#', 
    note: 'Another brief thought.',
    size: 'small' 
  },
  {
    id: 5,
    type: 'Visual',
    title: 'Inspirational Reference',
    link: '#',
    note: '',
    size: 'large',
    visualOnly: true
  }
];

// Helper function to get grid classes based on tile size
const getTileClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'medium':
      return 'md:col-span-2 md:row-span-1';
    case 'small':
    default:
      return 'md:col-span-1 md:row-span-1';
  }
};

// Helper function to get type-specific styling
const getTypeColors = (type: string) => {
  switch (type) {
    case 'Book':
      return 'from-accent-primary/20 to-accent-primary/10 theme-scandinavian:from-scandi-accent-primary/20 theme-scandinavian:to-scandi-accent-primary/10 text-accent-primary theme-scandinavian:text-scandi-accent-primary';
    case 'Video':
      return 'from-accent-secondary/20 to-accent-secondary/10 theme-scandinavian:from-scandi-accent-secondary/20 theme-scandinavian:to-scandi-accent-secondary/10 text-accent-secondary theme-scandinavian:text-scandi-accent-secondary';
    case 'Article':
      return 'from-accent-primary/20 to-accent-secondary/20 theme-scandinavian:from-scandi-accent-primary/20 theme-scandinavian:to-scandi-accent-secondary/20 text-accent-primary theme-scandinavian:text-scandi-accent-primary';
    case 'Visual':
    default:
      return 'from-accent-primary/15 to-accent-secondary/15 theme-scandinavian:from-scandi-accent-primary/15 theme-scandinavian:to-scandi-accent-secondary/15 text-accent-primary theme-scandinavian:text-scandi-accent-primary';
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

const RecommendationItem: React.FC<typeof recommendationsData[0]> = ({ type, title, link, note, size, visualOnly }) => (
  <div className={`h-full rounded-lg overflow-hidden ${visualOnly ? '' : 'border border-theme bg-theme-background card-enhanced'}`}>
    {visualOnly ? (
      // Visual-only recommendation - more vibrant gradient
      <div className="h-full min-h-[240px] bg-gradient-to-br from-accent-primary/15 to-accent-secondary/20 theme-scandinavian:from-scandi-accent-primary/15 theme-scandinavian:to-scandi-accent-secondary/20 flex items-center justify-center p-6">
        <p className="text-theme-primary/50 italic text-center">[ Midjourney - Curated Resources Visual ]</p>
      </div>
    ) : (
      // Content recommendation
      <div className="flex flex-col h-full">
        {size === 'medium' && (
          <div className="h-24 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10"></div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <span className={`text-xs uppercase tracking-wider font-medium mb-2 inline-block px-2 py-1 rounded bg-gradient-to-r ${getTypeColors(type)} bg-opacity-60`}>
            {type}
          </span>
          <h3 className="text-lg font-semibold theme-gradient-text hover:text-accent-secondary theme-scandinavian:hover:text-scandi-accent-secondary transition-colors">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <p className="text-sm text-theme-secondary flex-grow">{note}</p>
        </div>
      </div>
    )}
  </div>
);

const Recommendations: React.FC = () => {
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
      <h1 className={HeadingStyles.h1}>Recommendations</h1>
      <p className={`mt-6 mb-10 ${HeadingStyles.subtitle}`}>
        Resources, books, videos, and tools that I've found valuable and worth sharing.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min md:auto-rows-fr"> 
        {recommendationsData.map((item, index) => (
          <motion.div
            key={item.id}
            variants={childVariants}
            custom={index}
            className={`${getTileClasses(item.size)} theme-shadow hover:shadow-lg transition-all`}
            style={{ minHeight: item.size === 'small' ? '180px' : '220px' }}
          >
            <RecommendationItem {...item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Recommendations;
