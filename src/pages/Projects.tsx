import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Remove the CBS logo import that doesn't exist
// import cbsLogo from '../assets/cbs.png';
// Import the actual CBS logo using an absolute path
import cbsLogo from '/src/assets/projects/cbs.png';

// Enhanced project data with size information and images
const projectsData = [
  {
    id: "project1",
    title: "SAP BTP RAG Playground",
    description: "Full stack RAG application built on SAP Business Technology Platform with AI Core and HANA DB for efficient document processing and retrieval.",
    tech: ["Python", "React", "SAP BTP", "AI Core", "HANA DB"],
    link: "/projects/project1",
    size: "large", // keep original size designation
    hasImage: true,
    imagePath: "src/assets/projects/rag1.png",
    imageOnly: false,
    customClasses: "lg:w-[85%]" // Make 15% slimmer
  },
  {
    id: "project2",
    title: "Data Transformation Platform",
    description: "Automated data processing solution using LangGraph that saves hundreds of hours of manual data transformation in my department at SAP.",
    tech: ["Python", "LangGraph", "SAP BTP", "AI Services"],
    link: "/projects/project2",
    size: "medium", // keep original size designation
    hasImage: true,
    imageOnly: false,
    customClasses: "lg:w-[115%]" // Make 15% wider
  },
  {
    id: "project3", 
    title: "Agentic Sales Deck Generator",
    description: "LangGraph workflow that facilitates web search, reasoning, and vector retrieval to automatically create PowerPoint slides for sales decks.",
    tech: ["Python", "LangGraph", "PowerPoint API", "Vector DB"],
    link: "/projects/project3",
    size: "medium", // keep original size designation
    hasImage: true,
    imagePath: "src/assets/projects/agentic-sales1.png",
    imageOnly: false,
    customClasses: "lg:w-[115%]" // Make 15% wider
  },
  {
    id: "university-projects",
    title: "University Projects",
    description: "During my Masters I have completed additional projects on Applied Machine Learning, Business Data Processing and genAI Use Case Integration which are outlined here.",
    tech: ["Python", "Machine Learning", "Data Processing", "GenAI"],
    link: "/projects/university-projects",
    size: "full-width", // full width tile
    hasImage: false, // Changed to false since we don't have the image
    imageOnly: false,
    isUniversityProject: true
  }
];

// Helper function to get grid classes based on tile size
const getTileClasses = (size: string) => {
  switch (size) {
    case 'large':
      // Explicitly define large screen span (3 out of 5 columns)
      return 'md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2';
    case 'full-width':
      // Full width spans all columns (2 on md, 5 on lg)
      return 'md:col-span-2 lg:col-span-5';
    case 'medium': // Added case for medium
      // Medium spans 1 on md, 2 on lg (out of 5 columns)
      return 'md:col-span-1 lg:col-span-2'; 
    case 'small':
    default:
      // Small and default span 1 column on md, 1 on lg (out of 5)
      return 'md:col-span-1 lg:col-span-1'; 
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 flex-grow auto-rows-fr">
        {projectsData.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link}
            variants={childVariants}
            custom={index}
            className={`${getTileClasses(project.size)} relative group overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 ${project.isUniversityProject ? 'h-44' : ''}`}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{ 
              willChange: 'transform' // Performance hint
            }}
          >
            {/* Border overlay */}
            <div className="absolute inset-0 border border-theme rounded-lg group-hover:border-theme-hover transition-colors duration-300"></div>
            
            {project.isUniversityProject ? (
              // University project with special layout (1:2 ratio)
              <div className="h-full flex flex-row bg-theme-background">
                <div className="w-[10%] p-2 flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-30">
                  <img src={cbsLogo} alt="CBS Logo" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="w-[90%] p-4 flex flex-col">
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
            ) : project.imagePath ? (
              // Project with specific image path
              <div className="h-full flex flex-col">
                <div className={`h-1/2 flex items-center justify-center overflow-hidden`}>
                  <img src={project.imagePath} alt={`${project.title} preview`} className="object-cover w-full h-full"/>
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
