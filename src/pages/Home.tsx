import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { SiLichess, SiGoodreads } from "react-icons/si";

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

const Home: React.FC = () => {
  // Get animation variants and heading styles from layout context
  const { childVariants, HeadingStyles, GradientStyles } = useOutletContext<ContextType>();

  // Social media links - inline for the status section
  const socialLinks = [
    { icon: <FaGithub size={20} />, url: "https://github.com/lennardkaye", label: "GitHub" },
    { icon: <FaLinkedin size={20} />, url: "https://linkedin.com/in/lennardkaye", label: "LinkedIn" },
    { icon: <FaTwitter size={20} />, url: "https://x.com/lennardkaye", label: "Twitter" },
    { icon: <SiLichess size={20} />, url: "https://lichess.org/@/lennardk", label: "Lichess" },
    { icon: <SiGoodreads size={20} />, url: "https://www.goodreads.com/user/show/158337367-lennard", label: "Goodreads" },
    { icon: <FaEnvelope size={20} />, url: "mailto:lennard.kaye@gmail.com", label: "Email" }
  ];

  return (
    // Container to allow flex layout within the card
    <div className="flex flex-col justify-between min-h-[calc(100vh-13rem)] text-text-primary"> 
      {/* Top section: Intro Text */}
      <motion.div variants={childVariants} initial="initial" animate="animate" exit="exit">
        <h1 className={HeadingStyles.h1}>Lennard Kaye</h1>
        <p className={`mt-6 ${HeadingStyles.subtitle}`}>
          Tech-focused Business graduate based in Copenhagen, building full-stack applications and exploring the intersection of AI, data, and user experience. Currently seeking opportunities starting [Your Graduation Month] 2024.
        </p>
      </motion.div>

      {/* Middle Section: Empty placeholder for future image */}
      <motion.div 
        variants={childVariants}
        initial="initial" 
        animate="animate" 
        exit="exit"
        className={`my-10 h-80 bg-gradient-to-br ${GradientStyles.primary} rounded-lg overflow-hidden shadow-md`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-text-secondary/70 italic">[ Desert Architecture Image Placeholder ]</p>
        </div>
      </motion.div>

      {/* Bottom Section: Status Card with social icons */}
      <motion.div 
        variants={childVariants}
        initial="initial" 
        animate="animate" 
        exit="exit" 
        className={`bg-gradient-to-br ${GradientStyles.secondary} rounded-lg p-6 shadow-md`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-grow">
            <h2 className={HeadingStyles.h2}>Current Status</h2>
            <p className="mt-4 text-text-secondary">
              Open to collaboration on innovative projects and exploring new opportunities in tech.
            </p>
          </div>
          
          {/* Social icons in a grid */}
          <div className="flex flex-wrap gap-4 justify-end">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1 + (index * 0.05) }
                }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center shadow-md text-white transition-all duration-300 group-hover:shadow-lg">
                  {social.icon}
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
