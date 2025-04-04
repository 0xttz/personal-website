import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Thought entries data
const thoughtsData = [
  {
    id: 1,
    title: "On Building Products People Love",
    date: "April 15, 2024",
    summary: "Reflecting on the principles that guide exceptional product development - user-centered design, iterative processes, and finding the right balance between innovation and familiarity.",
    tags: ["Product Design", "UX"]
  },
  {
    id: 2,
    title: "The Evolution of Frontend Development",
    date: "March 28, 2024",
    summary: "Tracking the significant shifts in frontend development from jQuery to modern frameworks, and exploring where we might be headed next.",
    tags: ["Frontend", "Web Development"]
  },
  {
    id: 3,
    title: "AI Tools in My Daily Workflow",
    date: "March 10, 2024",
    summary: "How I've incorporated various AI tools into my creative and development processes, and the impact they've had on productivity and creativity.",
    tags: ["AI", "Productivity"]
  }
];

const Thoughts: React.FC = () => {
  // Get animation variants from layout context
  const childVariants = useOutletContext<Variants>();

  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col"
    >
      <h1 className="text-4xl font-bold text-text-primary mb-8">Thoughts</h1>
      <p className="text-lg text-text-secondary mb-10 max-w-3xl">
        A collection of essays and reflections on technology, design, and the digital landscape.
      </p>
      
      <div className="space-y-10">
        {thoughtsData.map((thought, index) => (
          <motion.article 
            key={thought.id}
            variants={childVariants}
            custom={index}
            className="border-b border-accent-primary/10 pb-10"
          >
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="text-2xl font-semibold text-text-primary">
                <a href={`#thought-${thought.id}`} className="hover:text-accent-secondary transition-colors">
                  {thought.title}
                </a>
              </h2>
              <span className="text-sm text-text-secondary">{thought.date}</span>
            </div>
            <p className="text-text-secondary mb-4">{thought.summary}</p>
            <div className="flex gap-2">
              {thought.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs bg-accent-primary/10 text-accent-primary px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default Thoughts;
