import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Updated project data for the main projects page
const mainProjectsData = [
  {
    id: "project1",
    title: "SAP BTP RAG Playground",
    description: "Full stack RAG application built on SAP Business Technology Platform with AI Core and HANA DB for efficient document processing and retrieval.",
    tech: ["Python", "React", "SAP BTP", "AI Core", "HANA DB"],
    link: "/projects/project1", // Keep specific link if needed, or remove if handled elsewhere
    size: "large", // Indicates it's one of the two main projects
    imagePath: "src/assets/projects/rag1.png",
  },
  {
    id: "project2",
    title: "Data Transformation Platform",
    description: "Automated data processing solution using LangGraph that saves hundreds of hours of manual data transformation in my department at SAP.",
    tech: ["Python", "LangGraph", "SAP BTP", "AI Services"],
    link: "/projects/project2", // Keep specific link if needed, or remove if handled elsewhere
    size: "large", // Indicates it's one of the two main projects
    imagePath: "src/assets/projects/data-transform1.png", // Assuming an image exists or will be added
  },
  {
    id: "other-projects",
    title: "Other Projects",
    description: "Explore additional projects including an Agentic Sales Deck Generator and various university works.",
    tech: ["Python", "LangGraph", "GenAI", "ML"], // Consolidated tech
    link: "/projects/other", // Link to the new summary page
    size: "full-width", // Span across the bottom
    hasImage: false,
  }
];

// Simplified grid class logic
const getTileClasses = (size: string) => {
  switch (size) {
    case 'large':
      // Each large project takes one column on medium screens and up
      return 'md:col-span-1 md:row-span-1'; 
    case 'full-width':
      // The "Other Projects" tile spans both columns on medium screens and up
      return 'md:col-span-2';
    default:
      // Default spans 1 column
      return 'md:col-span-1'; 
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

const Projects: React.FC = () => {
  // Get animation variants and heading styles from layout context
  const { childVariants, HeadingStyles, GradientStyles } = useOutletContext<ContextType>();
  
  return (
    <motion.div 
      className="p-4 sm:p-6 md:p-8 h-full flex flex-col overflow-hidden"
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      
      layoutId="page-content" // Ensure layout stability
    >
      <h1 className={HeadingStyles.h1}>Projects</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        A collection of full-stack applications and AI-driven projects built during my professional experience at SAP and academic studies. As a tech-savvy business major exploring the intersection of technology and business value, these projects showcase my practical approach to solving real-world problems through code.
      </p>
      
      {/* Updated Grid Layout: Fills remaining space, prevents grid scroll */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow min-h-0"> {/* Removed auto-rows-fr, added min-h-0 */}
        {mainProjectsData.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link} // Use the link directly
            variants={childVariants}
            custom={index}
            // Apply specific height for the full-width tile (made slimmer), keep others auto
            className={`${getTileClasses(project.size)} relative group overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ${project.size === 'full-width' ? 'h-40' : ''}`} // Changed h-48 to h-40
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{ 
              willChange: 'transform' // Performance hint
            }}
          >
            {/* Border overlay */}
            <div className="absolute inset-0 border border-theme rounded-lg group-hover:border-theme-hover transition-colors duration-300"></div>
            
            {project.imagePath ? (
              // Project with an image (Main Projects)
              <div className="h-full flex flex-col">
                {/* Image container takes roughly half the height */}
                <div className={`h-[55%] flex items-center justify-center overflow-hidden`}> 
                  <img src={project.imagePath} alt={`${project.title} preview`} className="object-cover w-full h-full"/>
                </div>
                {/* Text content container */}
                <div className="p-4 flex flex-col flex-grow bg-theme-background h-[45%]"> 
                  <h2 className="text-xl font-semibold theme-gradient-text mb-2">
                    {project.title}
                  </h2>
                  <p className="text-theme-secondary mb-4 flex-grow text-sm">{project.description}</p> 
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Regular project tile (Other Projects Tile)
              <div className="h-full p-4 flex flex-col justify-center bg-theme-background"> {/* Center content vertically */}
                <h2 className="text-xl font-semibold theme-gradient-text mb-2">
                  {project.title}
                </h2>
                <p className="text-theme-secondary mb-4">{project.description}</p> 
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Interactive gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
