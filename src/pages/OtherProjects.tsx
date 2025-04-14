import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Import the CBS logo needed for the University Projects section
import cbsLogo from '/src/assets/projects/cbs.png';

// Data for the projects to be summarized on this page
const otherProjectsData = [
  {
    id: "project3", 
    title: "Agentic Sales Deck Generator",
    description: "LangGraph workflow that facilitates web search, reasoning, and vector retrieval to automatically create PowerPoint slides for sales decks.",
    tech: ["Python", "LangGraph", "PowerPoint API", "Vector DB"],
    link: "/projects/project3", // Keep individual links if they exist
    imagePath: "src/assets/projects/agentic-sales1.png", // Include image if available
  },
  {
    id: "university-projects",
    title: "University Projects",
    description: "During my Masters I have completed additional projects on Applied Machine Learning, Business Data Processing and genAI Use Case Integration which are outlined here.",
    tech: ["Python", "Machine Learning", "Data Processing", "GenAI"],
    link: "/projects/university-projects", // Keep individual link if it exists
    isUniversityProject: true // Flag for special styling
  }
];

// Context type matching the one in Layout.tsx and Projects.tsx
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

const OtherProjects: React.FC = () => {
  const { childVariants, HeadingStyles } = useOutletContext<ContextType>();

  return (
    <motion.div 
      className="p-4 sm:p-6 md:p-8 h-full flex flex-col overflow-hidden"
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layoutId="page-content" // Consistent layout ID
    >
      <h1 className={HeadingStyles.h1}>Other Projects</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        A summary of additional AI and development projects.
      </p>

      <div className="flex flex-col gap-6 flex-grow overflow-y-auto pr-2"> {/* Added padding-right for scrollbar */} 
        {otherProjectsData.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link} // Link to individual project page if available
            variants={childVariants} 
            custom={index} // Stagger animation
            className={`relative group block overflow-hidden rounded-lg border border-theme hover:shadow-lg transition-all duration-300 hover:border-theme-hover ${project.isUniversityProject ? 'h-48' : ''}`} // Specific height for Uni project
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: 'transform' }}
          >
            {project.isUniversityProject ? (
              // Special layout for University Projects tile
              <div className="h-full flex flex-row bg-theme-background">
                <div className="w-[15%] md:w-[10%] p-2 flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-30"> {/* Adjusted width for responsiveness */}
                  <img src={cbsLogo} alt="CBS Logo" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="w-[85%] md:w-[90%] p-4 flex flex-col"> {/* Adjusted width */}
                  <h2 className="text-lg md:text-xl font-semibold theme-gradient-text mb-2">{project.title}</h2>
                  <p className="text-theme-secondary text-sm md:text-base mb-3 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                    {project.tech.map(tech => (
                      <span key={tech} className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Standard layout for other projects (with optional image)
              <div className="h-full flex flex-row bg-theme-background">
                {project.imagePath && (
                  <div className="w-[30%] md:w-[25%] flex-shrink-0 overflow-hidden"> {/* Image takes a portion of width */}
                    <img src={project.imagePath} alt={`${project.title} preview`} className="object-cover w-full h-full"/>
                  </div>
                )}
                <div className={`p-4 flex flex-col flex-grow ${project.imagePath ? 'w-[70%] md:w-[75%]' : 'w-full'}`}> {/* Adjust text width based on image presence */}
                  <h2 className="text-lg md:text-xl font-semibold theme-gradient-text mb-2">{project.title}</h2>
                  <p className="text-theme-secondary text-sm md:text-base mb-3 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                    {project.tech.map(tech => (
                      <span key={tech} className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Interactive overlay */}
            <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default OtherProjects; 