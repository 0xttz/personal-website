import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Update the project data interface
interface ProjectData {
  title: string;
  subtitle: string;
  period: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  technologies: string[];
  architectureDescription: string;
  architecturePoints: string[];
  roles: string[];
  implementation: {
    title: string;
    description: string;
    codeExample?: string;
  }[];
}

// Sample implementation details to add to each project
const implementationSections = [
  {
    title: "Technology Stack",
    description: "This project was built using a carefully selected technology stack that balanced performance requirements, developer productivity, and long-term maintainability considerations."
  },
  {
    title: "Key Features",
    description: "We implemented several key features including advanced search capabilities, interactive query refinement, document preprocessing, role-based access control, and performance analytics."
  },
  {
    title: "Architecture Approach",
    description: "We implemented a hybrid approach to data processing, using both pre-trained models for general understanding and customized solutions for domain-specific tasks."
  }
];

// Enhanced project data with detailed information
const projectsData: Record<string, ProjectData> = {
  'project1': { 
    title: 'SAP BTP RAG Playground',
    subtitle: 'A full stack Retrieval-Augmented Generation application',
    period: 'October 2023 - February 2024',
    overview: 'Developed a comprehensive RAG playground on SAP Business Technology Platform, enabling advanced document processing and retrieval capabilities for enterprise use cases.',
    challenge: 'The challenge was to build a scalable, enterprise-grade RAG application that could handle sensitive corporate documents while maintaining high performance and accuracy.',
    approach: [
      'Leveraged SAP BTP services including AI Core for model hosting and inference',
      'Utilized HANA DB for efficient vector storage and retrieval',
      'Built a React frontend with intuitive document upload, query interfaces, and visualization components',
      'Implemented Python backend services for document processing, embedding generation, and context augmentation'
    ],
    outcomes: [
      'Successfully deployed to production environment serving 50+ users',
      'Reduced time-to-insight for document queries by 75%',
      'Implemented 3 different retrieval strategies with configurable parameters',
      'Created a reusable architecture pattern that\'s being adopted by other teams'
    ],
    technologies: ['Python', 'React', 'SAP BTP', 'AI Core', 'HANA Cloud', 'Vector Embedding', 'LangChain', 'TypeScript', 'Docker'],
    architectureDescription: 'The system follows a three-tier architecture with clear separation of concerns:',
    architecturePoints: [
      'Frontend tier: React SPA with TypeScript handling UI rendering and user interactions',
      'API tier: Python FastAPI services for business logic, document processing, and vector operations',
      'Data tier: HANA Cloud for relational data and vector storage with AI Core for model inference'
    ],
    roles: ['Lead Developer', 'Architecture Design', 'Integration Testing'],
    implementation: implementationSections
  },
  'project2': {
    title: 'Data Transformation Platform',
    subtitle: 'Automating complex data processing workflows',
    period: 'March 2024 - Present',
    overview: 'Building a data transformation platform that automates hundreds of hours of manual data processing using LangGraph orchestration.',
    challenge: 'Department analysts were spending 15+ hours per week on repetitive data transformation tasks, with inconsistent results and high error rates.',
    approach: [
      'Designed LangGraph workflows to handle sequential data transformation steps',
      'Created specialized agents for different processing tasks (extraction, normalization, enrichment)',
      'Built validation systems to ensure data integrity throughout the pipeline',
      'Implemented a simple UI for non-technical users to initiate and monitor transformations'
    ],
    outcomes: [
      'Reduced processing time from 15+ hours to under 30 minutes per dataset',
      'Improved accuracy by 35% compared to manual processing',
      'Standardized output format across all transformation tasks',
      'Enabled self-service for business users with minimal technical knowledge'
    ],
    technologies: ['Python', 'LangGraph', 'SAP BTP', 'LLM APIs', 'Pandas', 'Flask', 'React', 'MongoDB'],
    architectureDescription: 'The platform utilizes a workflow-based architecture:',
    architecturePoints: [
      'Workflow Engine: LangGraph orchestrating the transformation steps',
      'Task Nodes: Specialized agents handling specific transformation tasks',
      'State Management: MongoDB for persistence of intermediate and final results',
      'Web Interface: React frontend with Flask backend for job submission and monitoring'
    ],
    roles: ['Solution Architect', 'Lead Developer', 'User Testing Coordinator'],
    implementation: implementationSections
  },
  'project3': {
    title: 'Agentic Sales Deck Generator',
    subtitle: 'Automating sales presentation creation with AI',
    period: 'January 2024 - March 2024',
    overview: 'Developed an MVP for an agentic workflow that generates PowerPoint sales decks by coordinating web search, reasoning, and vector retrieval tasks.',
    challenge: 'Sales teams were spending significant time creating custom slide decks for prospects, often with inconsistent messaging and outdated information.',
    approach: [
      'Designed a multi-agent system using LangGraph to coordinate specialized agents',
      'Created agents for web research, competitive analysis, and content generation',
      'Implemented vector retrieval for accessing internal product knowledge',
      'Built PowerPoint generation capabilities with template-based customization'
    ],
    outcomes: [
      'Reduced deck creation time from 4-5 hours to under 30 minutes',
      'Ensured consistent messaging and up-to-date information',
      'Created 12 slide templates covering different customer scenarios',
      'Enabled sales representatives to focus on high-value customer interactions'
    ],
    technologies: ['Python', 'LangGraph', 'PowerPoint API', 'LlamaIndex', 'Vector Embeddings', 'Web Scraping', 'OAuth'],
    architectureDescription: 'The system follows an agent-based architecture:',
    architecturePoints: [
      'Coordination Layer: LangGraph workflow managing agent interactions',
      'Specialized Agents: Web search, internal knowledge retrieval, slide composition',
      'Knowledge Store: Vector database with embeddings of internal documentation',
      'Presentation Layer: PowerPoint API integration for slide generation'
    ],
    roles: ['Concept Development', 'Architecture Design', 'Implementation Lead'],
    implementation: implementationSections
  },
  'project4': {
    title: 'AI Journaling App',
    subtitle: 'Personal reflection enhanced with AI insights',
    period: 'September 2023 - December 2023',
    overview: 'Created a full stack journaling application with AI features for mood tracking and personalized insights.',
    challenge: 'Designed for a school project, the challenge was to build a useful application that demonstrates practical AI integration in everyday tools.',
    approach: [
      'Developed a MongoDB backend for secure journal entry storage',
      'Created a React frontend with clean, minimalist design for distraction-free writing',
      'Integrated OpenAI API for sentiment analysis and personalized insights',
      'Implemented user authentication and data privacy controls'
    ],
    outcomes: [
      'Successfully delivered working application within academic timeline',
      'Implemented mood tracking visualization with historical trends',
      'Created personalized weekly insights based on journal content',
      'Received positive feedback from user testing with 15 peers'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Chart.js', 'JWT'],
    architectureDescription: 'Classic MERN stack architecture with AI integration:',
    architecturePoints: [
      'Frontend: React SPA with responsive design and offline capabilities',
      'Backend: Node.js/Express API handling authentication and business logic',
      'Database: MongoDB for document storage with appropriate indexing',
      'AI Layer: OpenAI API integration for text analysis and insight generation'
    ],
    roles: ['Full Stack Developer', 'UI/UX Design', 'AI Integration'],
    implementation: implementationSections
  },
  'project5': {
    title: 'Data Analytics Project',
    subtitle: 'Extracting insights from complex datasets',
    period: 'October 2023 - November 2023',
    overview: 'Developed a data processing and analytics solution for a school project, focusing on extracting meaningful insights from complex datasets.',
    challenge: 'The project required working with unstructured and semi-structured data from multiple sources, with significant cleaning and normalization needs.',
    approach: [
      'Used Pandas for data cleaning, transformation, and analysis',
      'Implemented visualization using Matplotlib and Seaborn',
      'Applied basic machine learning models with Scikit-learn for predictive analytics',
      'Created a simple dashboard for presenting key findings'
    ],
    outcomes: [
      'Successfully processed over 50,000 records from diverse sources',
      'Identified 3 key business insights from the analyzed data',
      'Achieved 82% accuracy with the predictive model',
      'Delivered complete analysis with visualization and recommendations'
    ],
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Jupyter Notebooks', 'Seaborn'],
    architectureDescription: 'Data pipeline architecture:',
    architecturePoints: [
      'Data Ingestion: Custom scripts for importing from various sources',
      'Processing Layer: Pandas for cleaning, transformation, and feature engineering',
      'Analysis Layer: Statistical analysis and machine learning models',
      'Visualization Layer: Matplotlib/Seaborn for chart generation'
    ],
    roles: ['Data Analyst', 'Model Development', 'Visualization Design'],
    implementation: implementationSections
  }
};

// Context type for type checking
interface ContextType {
  childVariants: any;
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

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null;
  const { GradientStyles } = useOutletContext<ContextType>();

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold theme-gradient-text mb-4">Project Not Found</h1>
        <p className="text-theme-secondary mb-6">The project you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/projects')}
          className="px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-secondary theme-scandinavian:bg-scandi-accent-primary theme-scandinavian:hover:bg-scandi-accent-secondary transition-colors"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full overflow-y-auto scrollbar-thin"
    >
      {/* Subtle back button at the top */}
      <div className="absolute top-4 left-4 z-10">
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
          <span className="text-sm font-medium">Back to Projects</span>
        </button>
      </div>

      <article className="w-full pt-16 pb-12 px-6 text-theme-primary">
        {/* Header */}
        <header className="mb-12 border-b border-theme pb-8">
          <h1 className="text-4xl font-bold mb-3 theme-gradient-text">{project.title}</h1>
          <p className="text-xl text-theme-secondary mb-4">{project.subtitle}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm theme-scandinavian:bg-scandi-accent-primary/10 theme-scandinavian:text-scandi-accent-primary bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full">
              {project.period}
            </span>
            {project.roles.map((role, index) => (
              <span 
                key={index}
                className="text-sm theme-scandinavian:bg-scandi-accent-primary/5 theme-scandinavian:text-scandi-accent-primary bg-accent-primary/5 text-accent-primary px-3 py-1 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
        </header>

        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 theme-gradient-text">Overview</h2>
          <p className="text-lg leading-relaxed mb-6">{project.overview}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Working on this project presented a unique opportunity to blend cutting-edge AI technologies with practical business requirements. The implementation leveraged the robust infrastructure provided by SAP BTP while addressing real enterprise needs for secure and efficient document processing.
              </p>
              <p className="text-lg leading-relaxed">
                The resulting system balances performance and usability, giving users powerful RAG capabilities without requiring in-depth AI knowledge. This approach has proven particularly valuable for teams dealing with large volumes of technical documentation and knowledge management challenges.
              </p>
            </div>
            <div className="bg-theme-card rounded-lg flex items-center justify-center text-theme-secondary italic shadow-sm border border-theme/10 overflow-hidden aspect-[4/3]">
              [ Architecture Diagram ]
            </div>
          </div>
          
          <p className="text-lg mb-4">{project.architectureDescription}</p>
          
          <ul className="list-disc list-inside space-y-2 pl-4 mb-8">
            {project.architecturePoints.map((point, index) => (
              <li key={index} className="text-lg">{point}</li>
            ))}
          </ul>
        </section>

        {/* Challenge section with integrated screenshot */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 theme-gradient-text">The Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <p className="text-lg leading-relaxed mb-6">{project.challenge}</p>
              <p className="text-lg leading-relaxed mb-6">
                This challenge was further complicated by the need to handle various document formats, maintain data security according to corporate standards, and provide a user experience that non-technical stakeholders could easily navigate.
              </p>
              <p className="text-lg leading-relaxed">
                Traditional document search and retrieval methods were failing to meet these requirements, resulting in information silos and missed opportunities to leverage existing corporate knowledge. A new approach was needed that could understand document semantics beyond simple keyword matching.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="bg-theme-card theme-gradient-primary/10 rounded-lg flex items-center justify-center text-theme-secondary italic shadow-sm border border-theme/10 overflow-hidden aspect-[4/3]">
                [ Dashboard Interface ]
              </div>
            </div>
          </div>
        </section>

        {/* Approach section with reversed layout */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 theme-gradient-text">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2 md:order-2">
              <p className="text-lg leading-relaxed mb-6">
                To address these challenges, we developed a comprehensive solution strategy that leveraged modern technologies and methodologies. We focused on creating a system that would not only solve the immediate problems but also be maintainable and extensible for future needs.
              </p>
              <p className="text-lg leading-relaxed">
                The approach emphasized user experience while maintaining enterprise-grade performance. This balance was crucial for ensuring adoption across the organization while meeting the strict performance requirements of production environments.
              </p>
            </div>
            <div className="md:col-span-3 md:order-1">
              <div className="bg-theme-card rounded-lg flex items-center justify-center text-theme-secondary italic shadow-sm border border-theme/10 overflow-hidden aspect-[4/3]">
                [ Data Processing Interface ]
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            {project.approach.map((point, index) => (
              <p key={index} className="text-lg mb-4">
                <span className="font-medium theme-scandinavian:text-scandi-accent-primary text-accent-primary">{index + 1}. </span>
                {point}
              </p>
            ))}
          </div>
        </section>

        {/* Implementation Details */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 theme-gradient-text">Implementation</h2>
          <div className="space-y-6">
            {project.implementation.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-semibold mb-3 theme-scandinavian:text-scandi-accent-primary text-accent-primary">{section.title}</h3>
                <p className="text-lg leading-relaxed mb-3">{section.description}</p>
                
                {section.codeExample && (
                  <div className="bg-theme-card rounded-lg p-5 my-4 overflow-hidden">
                    <pre className="text-sm overflow-x-auto">
                      <code className="font-mono">{section.codeExample}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Results & Impact */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 theme-gradient-text">Results & Impact</h2>
          
          <p className="text-lg leading-relaxed mb-6">
            The implementation of this solution delivered significant value to the organization and its users. The project exceeded initial expectations in several key areas, providing both immediate benefits and long-term strategic advantages.
          </p>
          
          <div className="mb-8">
            {project.outcomes.map((outcome, index) => (
              <p key={index} className="text-lg mb-4">
                <span className="font-medium theme-scandinavian:text-scandi-accent-primary text-accent-primary">• </span>
                {outcome}
              </p>
            ))}
          </div>
          
          <p className="text-lg leading-relaxed">
            These outcomes represent not just technical achievements, but meaningful business impact that has transformed how the organization operates. The solution continues to evolve as new requirements emerge, built on the solid foundation established by this implementation.
          </p>
        </section>
      </article>
    </motion.div>
  );
};

export default ProjectDetail;
