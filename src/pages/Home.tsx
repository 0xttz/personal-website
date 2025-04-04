import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiLichess, SiGoodreads } from "react-icons/si";
import { useOutletContext } from 'react-router-dom';

// Remove the old itemVariants as we're now using the context
// const itemVariants = {
//   initial: { opacity: 0, y: 15 },
//   in: { opacity: 1, y: 0 },
// };

const Home: React.FC = () => {
  // Get animation variants from layout context with correct type
  const childVariants = useOutletContext<Variants>();

  return (
    // Container to allow flex layout within the card
    <div className="flex flex-col justify-between min-h-[calc(100vh-13rem)] text-text-primary"> 
      {/* Top section: Intro Text */}
      <motion.div variants={childVariants} initial="initial" animate="animate" exit="exit">
        <h1 className="text-5xl font-bold mb-12">Lennard Kaye</h1>
        <p className="text-xl text-text-secondary mb-8 max-w-prose">
          Tech-focused Business graduate based in Copenhagen, building full-stack applications and exploring the intersection of AI, data, and user experience. Currently seeking opportunities starting [Your Graduation Month] 2024.
        </p>
      </motion.div>

      {/* Middle Section: Visual Element Placeholder */}
      <motion.div 
        variants={childVariants}
        initial="initial" 
        animate="animate" 
        exit="exit"
        className="my-12 h-72 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-lg flex items-center justify-center text-text-secondary/70 italic shadow-inner"
      >
        [ Midjourney - Terracotta Abstract Visual ]
      </motion.div>

      {/* Bottom Section: Socials */}
      <motion.div 
        variants={childVariants}
        initial="initial" 
        animate="animate" 
        exit="exit" 
        className="flex items-center"
      >
        <div className="flex gap-8">
          <a href="https://github.com/lennardkaye" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-text-secondary hover:text-accent-secondary transition-colors">
            <FaGithub size={28} />
          </a>
          <a href="https://linkedin.com/in/lennardkaye" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-text-secondary hover:text-accent-secondary transition-colors">
            <FaLinkedin size={28} />
          </a>
          <a href="https://x.com/lennardkaye" target="_blank" rel="noopener noreferrer" title="Twitter/X" className="text-text-secondary hover:text-accent-secondary transition-colors">
            <FaTwitter size={28} />
          </a>
          <a href="https://lichess.org/@/lennardk" target="_blank" rel="noopener noreferrer" title="Lichess" className="text-text-secondary hover:text-accent-secondary transition-colors">
            <SiLichess size={28} />
          </a>
          <a href="https://www.goodreads.com/user/show/158337367-lennard" target="_blank" rel="noopener noreferrer" title="Goodreads" className="text-text-secondary hover:text-accent-secondary transition-colors">
            <SiGoodreads size={28} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
