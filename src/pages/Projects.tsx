import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Enhanced project data with size information and images
const projectsData = [
  {
    id: "project1",
    title: "AI Chat Interface",
    description: "A responsive chat interface for AI conversations with sleek animations and real-time responses.",
    tech: ["React", "TypeScript", "Framer Motion", "OpenAI API"],
    link: "#",
    size: "large", // large tile
    hasImage: true
  },
  {
    id: "project2",
    title: "Nordic E-commerce Platform",
    description: "Full-stack e-commerce platform with minimalist design aesthetics and integrated payment processing.",
    tech: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    link: "#",
    size: "small", // small tile
    hasImage: false
  },
  {
    id: "project3", 
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with customizable charts and filters.",
    tech: ["D3.js", "React", "Firebase", "Material UI"],
    link: "#",
    size: "medium", // medium tile
    hasImage: false
  },
  {
    id: "project4",
    title: "Climate Impact Calculator",
    description: "Tool for individuals and businesses to calculate and offset their carbon footprint.",
    tech: ["Vue.js", "Node.js", "Chart.js", "MongoDB"],
    link: "#",
    size: "medium", // medium tile
    hasImage: true
  },
  {
    id: "project5",
    title: "Visual Experiment",
    description: "",
    tech: [],
    link: "#",
    size: "small", // small tile
    hasImage: true,
    imageOnly: true
  }
];

// Helper function to get grid classes based on tile size
const getTileClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'medium':
      return 'md:col-span-1 md:row-span-2';
    case 'small':
    default:
      return 'md:col-span-1 md:row-span-1';
  }
};

const Projects: React.FC = () => {
  // Get animation variants from layout context
  const childVariants = useOutletContext<Variants>();
  
  return (
    <motion.div 
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col h-full"
    >
      <h1 className="text-4xl font-bold text-text-primary mb-8">Projects</h1>
      <p className="text-lg text-text-secondary mb-10 max-w-3xl">
        A selection of projects I've built, exploring various technologies and design approaches.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-min md:auto-rows-fr gap-6 flex-grow">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            variants={childVariants}
            custom={index}
            className={`${getTileClasses(project.size)} border border-accent-primary/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow`}
            style={{ 
              minHeight: project.size === 'small' ? '200px' : '280px',
            }}
          >
            {project.imageOnly ? (
              // Image-only tile
              <div className="h-full w-full bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 p-4 flex items-center justify-center">
                <p className="text-text-primary/50 italic">[ Midjourney Visual ]</p>
              </div>
            ) : project.hasImage ? (
              // Project with image
              <div className="h-full flex flex-col">
                <div className="h-1/2 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 p-4 flex items-center justify-center">
                  <p className="text-text-primary/50 italic">[ Project Visual ]</p>
                </div>
                <div className="p-6 flex flex-col flex-grow bg-background">
                  <h2 className="text-xl font-semibold text-text-primary mb-3">
                    <a href={project.link} className="hover:text-accent-secondary transition-colors">
                      {project.title}
                    </a>
                  </h2>
                  <p className="text-text-secondary mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="text-xs bg-accent-primary/10 text-accent-primary px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Regular project tile
              <div className="h-full p-6 flex flex-col bg-background">
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  <a href={project.link} className="hover:text-accent-secondary transition-colors">
                    {project.title}
                  </a>
                </h2>
                <p className="text-text-secondary mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs bg-accent-primary/10 text-accent-primary px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
