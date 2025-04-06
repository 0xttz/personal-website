import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Enhanced recommendations data with size and visual information
const recommendationsData = [
  { 
    id: 1, 
    type: 'Video', 
    title: 'Karpathy - Intro to LLMs', 
    link: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', 
    note: "I find Karpathy's explanation of LLMs incredibly clear; he makes the topic accessible to a wide audience and i can not recommend his videos enough.",
    size: 'medium' 
  },
  { 
    id: 2, 
    type: 'Video', 
    title: 'Veritasium - Relativity', 
    link: 'https://www.youtube.com/watch?v=6akmv1bsz1M', 
    note: "One of many amazing videos from Veritasium about Einstein's theory of general relativity and how it not only led to the discovery of black holes but also might allow for wormholes to exist.",
    size: 'small' 
  },
  { 
    id: 3, 
    type: 'Article', 
    title: 'The Last Question - Asimov', 
    link: 'https://users.ece.cmu.edu/~gamvrosi/thelastq.html', 
    note: "This story always sticks with me. It's Asimov's favorite of all his stories, exploring entropy and the universe's fate.",
    size: 'small' 
  },
  { 
    id: 4, 
    type: 'Essay', 
    title: 'AI 2027', 
    link: 'https://ai-2027.com', 
    note: "A research scenario for how AI will change the world over the next few years. Valuable perspective on the future.",
    size: 'small' 
  },
  {
    id: 5,
    type: 'Book',
    title: 'The Brothers Karamazov',
    link: 'https://www.goodreads.com/book/show/4934.The_Brothers_Karamazov',
    note: "According to many, it's the best novel ever written. I don't disagree - Its definitely my favourite book, delving into questions of religion, morality, and the human condition.",
    size: 'medium'
  },
  {
    id: 6,
    type: 'Book',
    title: 'White Nights',
    link: 'https://www.goodreads.com/book/show/1772910.White_Nights',
    note: "A tragic love story spanning a few white St. Petersburg nights. Tragic, but beautiful.",
    size: 'small'
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

// Define the props type for RecommendationItem, making visualOnly optional
interface RecommendationItemProps {
  id: number;
  type: string;
  title: string;
  link: string;
  note: string;
  size: string;
  visualOnly?: boolean; // Make visualOnly optional
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ type, title, link, note, size, visualOnly }) => (
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
          <h3 className="text-lg font-semibold theme-gradient-text group-hover:text-accent-secondary theme-scandinavian:group-hover:text-scandi-accent-secondary transition-colors">
            {title}
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
      className="h-full flex flex-col"
      layoutId="page-content"
    >
      <h1 className={HeadingStyles.h1}>Recommendations</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        A curated list of books, articles, tools, and other resources that I've found valuable or inspiring.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr flex-grow"> 
        {recommendationsData.map((item, index) => (
          <motion.a
            key={item.id} 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={childVariants} 
            custom={index} 
            className={`${getTileClasses(item.size)} theme-shadow hover:shadow-lg transition-all block group focus:outline-none focus:ring-2 focus:ring-accent-primary/50 rounded-lg`}
          >
            <RecommendationItem {...item} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Recommendations;
