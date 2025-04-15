import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Path to background image
const recommendationsBgUrl = 'src/assets/recommendations.png';

// Restore original data order and remove theme property
const recommendationsData = [
  {
    id: 1,
    type: 'Video',
    title: 'Karpathy - Intro to LLMs',
    link: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
    note: "I find Karpathy's explanation of LLMs incredibly clear; he makes the topic accessible to a wide audience and i can not recommend his videos enough.",
    size: 'medium',
    // theme: 'AI & Technology' // Removed
  },
  {
    id: 2,
    type: 'Video',
    title: 'Veritasium - Relativity',
    link: 'https://www.youtube.com/watch?v=6akmv1bsz1M',
    note: "One of many amazing videos from Veritasium about Einstein's theory of general relativity and how it not only led to the discovery of black holes but also might allow for wormholes to exist.",
    size: 'small',
    // theme: 'Cosmic Wonders' // Removed
  },
  {
    id: 3,
    type: 'Article',
    title: 'The Last Question - Asimov',
    link: 'https://users.ece.cmu.edu/~gamvrosi/thelastq.html',
    note: "This story always sticks with me. It's Asimov's favorite of all his stories, exploring entropy and the universe's fate.",
    size: 'small',
    // theme: 'Cosmic Wonders' // Removed
  },
  {
    id: 4,
    type: 'Essay',
    title: 'AI 2027',
    link: 'https://ai-2027.com',
    note: "A research scenario for how AI will change the world over the next few years. Valuable perspective on the future.",
    size: 'small',
    // theme: 'AI & Technology' // Removed
  },
  {
    id: 5,
    type: 'Book',
    title: 'The Brothers Karamazov',
    link: 'https://www.goodreads.com/book/show/4934.The_Brothers_Karamazov',
    note: "According to many, it's the best novel ever written. I don't disagree - Its definitely my favourite book, delving into questions of religion, morality, and the human condition.",
    size: 'medium',
    // theme: 'Literary Journeys' // Removed
  },
  {
    id: 6,
    type: 'Book',
    title: 'White Nights',
    link: 'https://www.goodreads.com/book/show/1772910.White_Nights',
    note: "A tragic love story spanning a few white St. Petersburg nights. Tragic, but beautiful.",
    size: 'small',
    // theme: 'Literary Journeys' // Removed
  },
  {
    id: 7,
    type: 'Picture',
    title: 'Hubble Ultra Deep Field Image',
    link: 'https://esahubble.org/images/heic0611b/',
    note: "Arguably the most incredible image produced by humanity. This remarkable view shows nearly 10,000 galaxies, some of which formed when the universe was just 800 million years old, allowing us to look back into the earliest days of cosmic history.",
    size: 'large',
    // theme: 'Cosmic Wonders' // Removed
  }
];

// Helper function to get grid classes based on tile size (Adjusted for fewer MD columns)
const getTileClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 lg:col-span-2'; // Takes 2 cols on MD and LG
    case 'medium':
      return 'md:col-span-2 lg:col-span-2'; // Takes 2 cols on MD and LG
    case 'small':
    default:
      return 'md:col-span-1 lg:col-span-1'; // Takes 1 col on MD and LG
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
    case 'Picture':
      return 'from-accent-secondary/20 to-accent-primary/20 theme-scandinavian:from-scandi-accent-secondary/20 theme-scandinavian:to-scandi-accent-primary/20 text-accent-secondary theme-scandinavian:text-scandi-accent-secondary';
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

// Define the props type for RecommendationItem, removing theme
interface RecommendationItemProps {
  id: number;
  type: string;
  title: string;
  link: string;
  note: string;
  size: string;
  visualOnly?: boolean;
}

// RecommendationItem component - Use responsive max-height for images
const RecommendationItem: React.FC<RecommendationItemProps> = ({ type, title, link, note, size }) => (
  <div className={`h-full rounded-lg overflow-hidden flex flex-col border border-theme bg-theme-background card-enhanced group`}>
    {/* Image section - Use responsive max-height */}
    {(type === 'Picture' && title === 'Hubble Ultra Deep Field Image') && (
      // Apply responsive max-height: small on mobile, larger on bigger screens
      <div className="w-full max-h-20 md:max-h-32 lg:max-h-40 overflow-hidden bg-black"> 
        <img
          src="https://esahubble.org/media/archives/images/thumb700x/heic0611b.jpg"
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
    )}
    {title === 'The Brothers Karamazov' && (
      // Apply responsive max-height: small on mobile, larger on bigger screens
      <div className="w-full max-h-20 md:max-h-32 lg:max-h-40 overflow-hidden"> 
        <img
          src="src/assets/karamzov.png"
          alt={title}
          className="w-full h-auto object-top opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>
    )}

    {/* Content section - Remove line-clamp */}
    <div className="p-2 flex flex-col flex-1 overflow-hidden"> {/* Padding p-2 */}
      <div className="flex justify-between items-center mb-1"> {/* Margin mb-1 */}
        <span className={`text-[10px] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded bg-gradient-to-r ${getTypeColors(type)} bg-opacity-60`}> {/* Smaller text/padding */}
          {type}
        </span>
      </div>
      <h3 className="text-sm font-semibold theme-gradient-text group-hover:text-accent-secondary theme-scandinavian:group-hover:text-scandi-accent-secondary transition-colors line-clamp-1"> {/* Title text-sm */}
        {title}
      </h3>
      <p className="text-xs text-theme-secondary mt-1 overflow-hidden">{note}</p> 
    </div>
  </div>
);

const Recommendations: React.FC = () => {
  // Get animation variants and heading styles from layout context
  const { childVariants, HeadingStyles } = useOutletContext<ContextType>();

  // Removed grouping logic

  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layoutId="page-content"
      // Standardized outer padding to match Thoughts.tsx
      className="p-4 sm:p-6 md:p-8 h-full flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${recommendationsBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={`${HeadingStyles.h1} lowercase`}>recommendations</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        A curated list of books, articles, tools, and other resources that I've found valuable or inspiring.
      </p>

      {/* Grid container - Adjusted gap for larger screens */}
      <div className="flex-grow grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5 p-1 overflow-hidden">
        {recommendationsData.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={childVariants}
            custom={index}
            // Apply col-span based on size, now considering the adjusted grid columns
            className={`theme-shadow hover:shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all duration-300 ${getTileClasses(item.size)} flex`}
          >
            <RecommendationItem {...item} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Recommendations;
