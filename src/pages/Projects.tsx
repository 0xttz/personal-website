import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Example project data
const projectsData = [
  {
    id: "project1",
    title: "AI Chat Interface",
    description: "A responsive chat interface for AI conversations with sleek animations and real-time responses.",
    tech: ["React", "TypeScript", "Framer Motion", "OpenAI API"],
    link: "#"
  },
  {
    id: "project2",
    title: "Nordic E-commerce Platform",
    description: "Full-stack e-commerce platform with minimalist design aesthetics and integrated payment processing.",
    tech: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    link: "#"
  },
  {
    id: "project3", 
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with customizable charts and filters.",
    tech: ["D3.js", "React", "Firebase", "Material UI"],
    link: "#"
  },
  {
    id: "project4",
    title: "Climate Impact Calculator",
    description: "Tool for individuals and businesses to calculate and offset their carbon footprint.",
    tech: ["Vue.js", "Node.js", "Chart.js", "MongoDB"],
    link: "#"
  }
];

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            variants={childVariants}
            custom={index}
            className="border border-accent-primary/20 rounded-lg p-6 bg-background hover:shadow-md transition-shadow flex flex-col"
          >
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
