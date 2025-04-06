import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Enhanced project data with size information and images
const projectsData = [
  {
    id: "project1",
    title: "SAP BTP RAG Playground",
    description: "Full stack RAG application built on SAP Business Technology Platform with AI Core and HANA DB for efficient document processing and retrieval.",
    tech: ["Python", "React", "SAP BTP", "AI Core", "HANA DB"],
    link: "/projects/project1",
    size: "large", // large tile
    hasImage: true,
    imageOnly: false
  },
  {
    id: "project2",
    title: "Data Transformation Platform",
    description: "Automated data processing solution using LangGraph that saves hundreds of hours of manual data transformation in my department at SAP.",
    tech: ["Python", "LangGraph", "SAP BTP", "AI Services"],
    link: "/projects/project2",
    size: "medium", // medium tile
    hasImage: true,
    imageOnly: false
  },
  {
    id: "project3", 
    title: "Agentic Sales Deck Generator",
    description: "LangGraph workflow that facilitates web search, reasoning, and vector retrieval to automatically create PowerPoint slides for sales decks.",
    tech: ["Python", "LangGraph", "PowerPoint API", "Vector DB"],
    link: "/projects/project3",
    size: "medium", // medium tile
    hasImage: false,
    imageOnly: false
  },
  {
    id: "project4",
    title: "AI Journaling App",
    description: "Full stack journaling application with basic AI features for mood tracking and insight generation.",
    tech: ["React", "Node.js", "MongoDB", "OpenAI API"],
    link: "/projects/project4",
    size: "small", // small tile
    hasImage: false,
    imageOnly: false
  },
  {
    id: "project5",
    title: "Data Analytics Project",
    description: "Data processing and analytics project focusing on extracting insights from complex datasets.",
    tech: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    link: "/projects/project5",
    size: "small", // small tile
    hasImage: false,
    imageOnly: false
  }
];

// Helper function to get grid classes based on tile size
const getTileClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'small':
    default:
      return 'md:col-span-1'; // Simplified: only large spans multiple columns/rows
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
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      
      layoutId="page-content" // Ensure layout stability
      className="h-full flex flex-col"
    >
      <h1 className={HeadingStyles.h1}>Projects</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        A collection of full-stack applications and AI-driven projects built during my professional experience at SAP and academic studies. As a tech-savvy business major exploring the intersection of technology and business value, these projects showcase my practical approach to solving real-world problems through code.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow auto-rows-fr">
        {projectsData.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link}
            variants={childVariants}
            custom={index}
            className={`${getTileClasses(project.size)} relative group overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300`}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{ 
              willChange: 'transform' // Performance hint
            }}
          >
            {/* Border overlay */}
            <div className="absolute inset-0 border border-theme rounded-lg group-hover:border-theme-hover transition-colors duration-300"></div>
            
            {project.imageOnly ? (
              // Image-only tile
              <div className={`h-full w-full theme-gradient-primary p-4 flex items-center justify-center`}>
                <p className="text-theme-primary/50 italic">[ Midjourney Visual ]</p>
              </div>
            ) : project.hasImage ? (
              // Project with image
              <div className="h-full flex flex-col">
                <div className={`h-1/2 theme-gradient-primary p-2 flex items-center justify-center`}>
                  <p className="text-theme-primary/50 italic">[ Project Visual ]</p>
                </div>
                <div className="p-4 flex flex-col flex-grow bg-theme-background">
                  <h2 className="text-xl font-semibold theme-gradient-text mb-2">
                    {project.title}
                  </h2>
                  <p className="text-theme-secondary mb-4 flex-grow">{project.description}</p>
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
              // Regular project tile
              <div className="h-full p-4 flex flex-col bg-theme-background">
                <h2 className="text-xl font-semibold theme-gradient-text mb-2">
                  {project.title}
                </h2>
                <p className="text-theme-secondary mb-4 flex-grow">{project.description}</p>
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
