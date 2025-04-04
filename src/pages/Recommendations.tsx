import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Placeholder data
const recommendationsData = [
  { id: 1, type: 'Video', title: 'Karpathy - Intro to LLMs', link: '#', note: 'Excellent foundational overview.' },
  { id: 2, type: 'Video', title: 'Veritasium - Relativity', link: '#', note: 'Makes complex physics accessible.' },
  { id: 3, type: 'Book', title: 'Book Title 1', link: '#', note: 'Brief thought on why it\'s recommended.' },
  { id: 4, type: 'Book', title: 'Book Title 2', link: '#', note: 'Another brief thought.' },
];

const RecommendationItem: React.FC<typeof recommendationsData[0]> = ({ type, title, link, note }) => (
  <div className="border border-accent-primary/20 rounded-lg p-4 bg-background">
    <span className="text-xs uppercase tracking-wider text-accent-primary font-medium">{type}</span>
    <h3 className="text-lg font-semibold text-text-primary mt-1 mb-2">
      <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-accent-secondary transition-colors">
        {title}
      </a>
    </h3>
    <p className="text-sm text-text-secondary">{note}</p>
  </div>
);

const Recommendations: React.FC = () => {
  // Get animation variants from layout context
  const childVariants = useOutletContext<Variants>();

  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-4xl font-bold text-text-primary mb-12">Recommendations</h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      > 
        {recommendationsData.map((item, index) => (
          <motion.div
            key={item.id}
            variants={childVariants}
            custom={index}
          >
            <RecommendationItem {...item} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Recommendations;
