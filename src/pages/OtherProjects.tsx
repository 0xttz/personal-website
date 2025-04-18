import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useOutletContext, useNavigate } from 'react-router-dom';

// Import project images (Using relative paths)
import agenticSales1 from '../assets/projects/agentic-sales1.png'; 
import agenticSales2 from '../assets/projects/agentic-sales2.png'; // Assuming this one is still in /projects subfolder
import tei1 from '../assets/projects/tei1.png'; 
import tei2 from '../assets/projects/tei2.png'; 
import ml1 from '../assets/projects/aml1.png'; 
import ml2 from '../assets/projects/aml2.png'; 
import data1 from '../assets/projects/bdp1.png'; 
import data2 from '../assets/projects/bdp2.png'; 

// Background image for the page
import othersBgUrl from '/src/assets/others.png'; 

// Define the structure for a single small project
interface SmallProject {
  id: string;
  title: string;
  description: string;
  imagePath: string; // Will hold the imported variable for image 1
  imagePath2?: string; // Will hold the imported variable for image 2
  tech: string[];
  status?: string; 
}

// Updated project data
const otherProjectsData: SmallProject[] = [
  { 
    id: 'projA', 
    title: 'Agentic Sales Deck Generator (POC)', 
    description: 'Developed a Proof of Concept using LangGraph to orchestrate AI agents for automated strategic company analysis (industry, priorities, CXOs) and PowerPoint generation. Leveraged SAP AI Core for multi-LLM access, Firecrawl for targeted web scraping, and HANA Cloud Vector Engine for contextual knowledge retrieval from internal documents. The system provided real-time progress updates via WebSockets.', 
    imagePath: agenticSales1, 
    imagePath2: agenticSales2, 
    tech: ['Python', 'LangGraph', 'AI Core', 'HANA DB', 'SocketIO', 'Firecrawl', 'PowerPoint API'], 
    status: 'This POC is currently being developed into an MVP by a dedicated team, where I am responsible for the Frontend development using React.' 
  },
  { 
    id: 'projB', 
    title: 'Tei: Full Stack Journaling App', 
    description: 'One of the first full-stack applications I built. It allows users to write journal entries with rich text editing, manage tags and moods, and utilizes simple AI features powered by the Anthropic API for sentiment analysis, automatic tag suggestions, and title generation.', 
    imagePath: tei1, // Replace with actual import variable
    imagePath2: tei2, // Replace with actual import variable
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Anthropic API', 'JWT', 'Rich Text Editor'] 
  },
  { 
    id: 'projC', 
    title: 'University Project: Applied Machine Learning', 
    description: 'Implemented and evaluated several pricing algorithms (regressive and non-regressive models) for predicting AirBnB prices across major European cities. Utilized a rich dataset containing over 20 features and 50,000 entries, focusing on feature engineering and model comparison.', 
    imagePath: ml1, // Replace with actual import variable
    imagePath2: ml2, // Replace with actual import variable
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter', 'Data Visualization'] 
  },
  { 
    id: 'projD', 
    title: 'University Project: Business Data Processing', 
    description: 'Constructed a complete data pipeline involving API-based data retrieval, preprocessing and cleaning using Python, data storage and querying with PostgreSQL, and culminating in the creation of real-time monitoring dashboards using Tableau.', 
    imagePath: data1, // Replace with actual import variable
    imagePath2: data2, // Replace with actual import variable
    tech: ['Python', 'Pandas', 'PostgreSQL', 'SQL', 'Tableau', 'API Integration'] 
  },
  // Removed projE placeholder
];

// Context type
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
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-theme-secondary/30 scrollbar-track-transparent hover:scrollbar-thumb-theme-secondary/50 transition-colors duration-200 relative"
      variants={childVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        backgroundImage: `url(${othersBgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed' 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-theme-background/70 backdrop-blur-sm z-0"></div>

      {/* Content */}
      <article className="relative z-10 w-full max-w-4xl mx-auto pt-16 pb-12 px-4 sm:px-6">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-30">
          <button 
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-theme-secondary hover:text-accent-primary hover:theme-scandinavian:text-scandi-accent-primary transition-colors group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Main Projects</span>
          </button>
        </div>

        {/* Page Header */}
        <header className="mb-12 border-b border-theme pb-8">
          <h1 className={`${HeadingStyles.h1} lowercase mb-2`}>Other Projects</h1>
          <p className={`${HeadingStyles.subtitle}`}>
            A collection of smaller projects, proofs-of-concept, and university work demonstrating various skills and technologies.
          </p>
        </header>

        {/* Project Sections - Refined Layouts */}
        <div className="space-y-16 md:space-y-20">
          {otherProjectsData.map((project, index) => {
            return (
              <motion.section
                key={project.id}
                className="border-b border-theme pb-12 last:border-b-0 last:pb-0"
                variants={childVariants}
                custom={index}
                initial="initial"
                animate="animate"
              >
                {/* Project Header */}
                <h2 className="text-2xl md:text-3xl font-semibold theme-gradient-text mb-6">{project.title}</h2>

                {/* === Agentic Sales (projA): Side-by-side Images First === */}
                {project.id === 'projA' && (
                  <div className="mb-6">
                     {/* Images */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                       <div className={`w-full overflow-hidden rounded-lg border border-theme/10 h-96 md:h-[450px]`}> <img src={project.imagePath} alt={`${project.title} - view 1`} className={`object-cover w-full h-full`} /> </div>
                       {project.imagePath2 && (<div className={`w-full overflow-hidden rounded-lg border border-theme/10 h-96 md:h-[450px]`}> <img src={project.imagePath2} alt={`${project.title} - view 2`} className={`object-cover w-full h-full`} /> </div>)}
                     </div>
                     {/* Description and Tech */}
                     <p className="text-lg text-theme-primary leading-relaxed mb-4">{project.description}</p>
                     {project.status && (<p className="text-md italic text-accent-primary/80 theme-scandinavian:text-scandi-accent-primary/80 leading-relaxed mb-4">Note: {project.status}</p>)}
                     <div className="flex flex-wrap gap-2">
                       {project.tech.map(tech => (<span key={tech} className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary">{tech}</span>))}
                     </div>
                   </div>
                )}

                {/* === Tei Journaling (projB): Text Left, Images Right Overlapping === */}
                {project.id === 'projB' && (
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6">
                    {/* Description and Tech (Left) */}
                    <div className="w-full md:w-3/5 lg:w-[55%]">
                      <p className="text-lg text-theme-primary leading-relaxed mb-6">{project.description}</p>
                       <div className="flex flex-wrap gap-2">
                         {project.tech.map(tech => (<span key={tech} className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary">{tech}</span>))}
                       </div>
                    </div>
                    {/* Image Container (Right, Overlapping) - Flexible Height */}
                    <div className={`w-full md:w-2/5 lg:w-[45%] flex-shrink-0 relative max-h-96`}> 
                      {/* Image 1: Background - Increased size, removed border/shadow */}
                      <div className="absolute top-0 left-0 w-[95%] h-[95%] overflow-hidden rounded-lg z-0"> 
                        <img src={project.imagePath} alt={`${project.title} - view 1`} className="object-contain w-full h-full"/>
                      </div>
                      {/* Image 2: Foreground - Increased size, removed border/shadow */}
                      {project.imagePath2 && (
                        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] overflow-hidden rounded-lg z-10"> 
                           <img src={project.imagePath2} alt={`${project.title} - view 2`} className="object-contain w-full h-full"/>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* === Applied ML (projC): Images Left, Text Right Overlapping === */}
                {project.id === 'projC' && (
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6">
                     {/* Image Container (Left, Overlapping) - Flexible Height */}
                     <div className={`w-full md:w-2/5 lg:w-[45%] flex-shrink-0 relative max-h-96 md:order-first`}> 
                       {/* Image 1: Table - Background, removed border/shadow */}
                       <div className="absolute top-0 left-0 w-[90%] h-[90%] overflow-hidden rounded-lg z-0"> 
                         <img src={project.imagePath} alt={`${project.title} - view 1`} className={`object-contain w-full h-full`}/>
                       </div>
                       {/* Image 2: Plots - Foreground, removed border/shadow */}
                       {project.imagePath2 && (
                         <div className="absolute bottom-0 right-0 w-[70%] h-[70%] overflow-hidden rounded-lg z-10"> 
                           <img src={project.imagePath2} alt={`${project.title} - view 2`} className={`object-contain w-full h-full`}/>
                        </div>
                       )}
                     </div>
                     {/* Description and Tech (Right) */}
                     <div className="w-full md:w-3/5 lg:w-[55%]">
                      <p className="text-lg text-theme-primary leading-relaxed mb-6">{project.description}</p>
                       <div className="flex flex-wrap gap-2">
                         {project.tech.map(tech => (<span key={tech} className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary">{tech}</span>))}
                       </div>
                    </div>
                  </div>
                )}

                 {/* === Business Data (projD): Text Left, Images Right Overlapping === */}
                 {project.id === 'projD' && (
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6">
                    {/* Description and Tech (Left) */}
                     <div className="w-full md:w-3/5 lg:w-[55%]">
                      <p className="text-lg text-theme-primary leading-relaxed mb-6">{project.description}</p>
                       <div className="flex flex-wrap gap-2">
                         {project.tech.map(tech => (<span key={tech} className="text-xs bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 text-accent-primary px-2 py-1 rounded theme-scandinavian:bg-gradient-to-r theme-scandinavian:from-scandi-accent-primary/10 theme-scandinavian:to-scandi-accent-secondary/10 theme-scandinavian:text-scandi-accent-primary">{tech}</span>))}
                       </div>
                    </div>
                    {/* Image Container (Right, Overlapping) - Flexible Height */}
                    <div className={`w-full md:w-2/5 lg:w-[45%] flex-shrink-0 relative max-h-96`}> 
                       {/* Image 1: Flowchart - Background, removed border/shadow */}
                       <div className="absolute top-0 left-0 w-[90%] h-[90%] overflow-hidden rounded-lg z-0"> 
                          <img src={project.imagePath} alt={`${project.title} - view 1`} className="object-contain w-full h-full"/>
                       </div>
                       {/* Image 2: Plot - Foreground, removed border/shadow */}
                       {project.imagePath2 && (
                        <div className="absolute bottom-0 right-0 w-[70%] h-[70%] overflow-hidden rounded-lg z-10"> 
                          <img src={project.imagePath2} alt={`${project.title} - view 2`} className="object-contain w-full h-full"/>
                        </div>
                       )}
                     </div>
                   </div>
                 )}

              </motion.section>
            );
          })}
        </div>
      </article>
    </motion.div>
  );
};

export default OtherProjects; 