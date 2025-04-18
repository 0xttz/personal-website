import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Path to background image
const projectsBgUrl = 'src/assets/projects.png';

// Updated project data for the main projects page
const mainProjectsData = [
  {
    id: "ai-playground",
    title: "GenAI Playground with RAG",
    description: "Secure, enterprise-ready GenAI playground on SAP BTP. Features RAG via HANA Cloud Vector Engine, multi-LLM support (GPT-4o, Claude 3.7, Gemini) through AI Core, and real-time updates via WebSockets.",
    tech: ["Python", "Flask", "React", "TypeScript", "SAP BTP", "AI Core", "HANA DB Vector", "Socket.IO"],
    link: "/projects/ai-playground",
    size: "large",
    imagePath: "src/assets/projects/rag1.png",
  },
  {
    id: "project2",
    title: "Data Transformation Platform",
    description: "Automated Proof Point extraction & Value Driver mapping at SAP using LangGraph & AI. Processes 60k+ vectors in HANA DB, saving an estimated 300-400 hours/year with Human-in-the-Loop validation.",
    tech: ["Python", "LangGraph", "SAP BTP", "AI Services", "HANA DB Vector"],
    link: "/projects/project2",
    size: "large",
    imagePath: "src/assets/projects/data1.png",
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
      style={{
        backgroundImage: `url(${projectsBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={`${HeadingStyles.h1} lowercase`}>projects</h1>
      <p className={`mt-2 mb-4 ${HeadingStyles.subtitle}`}>
        Throughout the past 2 years, I have built a variety of projects both as part of my job at SAP, during my studies and in my free time. Some of these projects are showcased here.
      </p>
      
      {/* Grid Layout: Reduced gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5 xl:gap-6 flex-grow min-h-0">
        {mainProjectsData.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link} 
            variants={childVariants}
            custom={index}
            // Conditional styling: Apply standard style or distinct style for 'Other Projects'
            className={`${getTileClasses(project.size)} relative group overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 
                       ${project.id === 'other-projects' ? `bg-gradient-to-br ${GradientStyles.soft}` : 'bg-theme-card'}`}
            // Conditional hover animation
            whileHover={ project.id === 'other-projects' ? { y: -3 } : { y: -3, scale: 1.01 } }
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
              // Other Projects Tile - Align top, adjust text lightness
              <div className={`relative h-full p-3 lg:p-4 flex flex-col justify-start overflow-hidden rounded-lg`}>
                {/* Removed the dark overlay */}
                {/* Content Wrapper */}
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold theme-gradient-text mb-2">
                    {project.title}
                  </h2>
                  {/* Changed text color class */}
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
