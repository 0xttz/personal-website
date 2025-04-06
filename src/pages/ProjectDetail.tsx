import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Import project images
import ragImage1 from '../assets/projects/rag1.png';
import ragImage2 from '../assets/projects/rag2.png';
import agenticSalesImage1 from '../assets/projects/agentic-sales1.png';
import agenticSalesImage2 from '../assets/projects/agentic-sales2.png';

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
    imagePath?: string;
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
    subtitle: 'A full stack AI chat application with Retrieval-Augmented Generation (RAG) capabilities',
    period: 'October 2023 - February 2024',
    overview: 'Developed a comprehensive AI chat application featuring Retrieval Augmented Generation (RAG) capabilities. Built on a modern client-server architecture, the system integrates a React TypeScript frontend with a Python Flask backend, featuring JWT-based authentication, real-time WebSocket communication, advanced document management with vector storage, and flexible AI model integration.',
    challenge: 'The primary challenge was to design and build a scalable, secure, and robust application capable of handling complex document processing, real-time AI interactions, and efficient retrieval from large datasets within an enterprise environment, specifically leveraging SAP BTP services.',
    approach: [
      'Designed a client-server architecture using React/TypeScript for the frontend SPA and Python/Flask for the backend API.',
      'Implemented real-time communication using WebSockets (Flask-Sock) for streaming AI responses and status updates.',
      'Secured the application using JWT-based authentication across both REST and WebSocket endpoints.',
      'Developed a sophisticated RAG pipeline including document ingestion, text extraction (with OCR), chunking, embedding generation, and vector storage/search.',
      'Integrated external AI services via a dedicated AI Service layer with adapters for multi-model support.',
      'Utilized a layered service architecture in the backend for modularity and dependency injection (Base, Core, High-Level services).'
    ],
    outcomes: [
      'A fully functional RAG application enabling users to chat with AI models augmented by knowledge from uploaded documents.',
      'Real-time, streaming responses for chat interactions via WebSockets.',
      'Robust document management system with background processing for ingestion, chunking, and embedding.',
      'Secure user authentication and data isolation.',
      'Modular and scalable backend architecture ready for extension.',
      'Intuitive frontend interface for chat, document management, and RAG configuration.'
    ],
    technologies: [
      'Python', 'Flask', 'Flask-Sock', 'Flask-JWT-Extended', 
      'React', 'TypeScript', 'TailwindCSS', 'React Router', 'React Query', 
      'WebSocket', 'JWT', 'LangChain', 'Vector Database', 'Docker', 
      'SAP BTP', 'AI Core'
    ],
    architectureDescription: 'The application employs a multi-faceted architecture:',
    architecturePoints: [
      'Client-Server: React SPA communicating with a Python Flask backend via REST APIs and WebSockets.',
      'RAG System: Dedicated pipeline for document processing, vector embedding/storage, and context retrieval.',
      'WebSocket System: Handles real-time bidirectional communication for chat and status updates with message queuing.',
      'AI Integration: Modular service layer interfacing with external AI models, supporting streaming and context injection.',
      'Layered Backend: Services organized into Base, Core, and High-Level tiers for clear separation of concerns.'
    ],
    roles: ['Lead Developer', 'Architecture Design', 'Integration Testing'],
    implementation: [
      {
        title: "Frontend Architecture",
        description: "The frontend is a Single Page Application (SPA) built with React and TypeScript, utilizing TailwindCSS for styling. Key components include dedicated pages for chat, document management, and authentication, managed UI components (like Message Bubbles, Document Uploader), Zustand for state management (inferred, common pattern, adjust if different), and specific services for API and WebSocket communication. React Query handles data fetching and caching.",
        imagePath: ragImage1
      },
      {
        title: "Backend Architecture",
        description: "The Python Flask backend exposes RESTful APIs and WebSocket endpoints. It features a layered service architecture (Service Container, Base/Core/High-Level Services) for managing dependencies and logic. Core components include Authentication, Document Processing, RAG operations, AI model interaction (via AICoreService and ModelService), and WebSocket handling. JWT manages authentication.",
        imagePath: ragImage2
      },
      {
        title: "RAG Pipeline",
        description: "The RAG system processes uploaded documents through a pipeline: file handling, text extraction (including OCR), chunking, embedding generation (using models from AI Core), and storage in a Vector Database. During queries, user input is embedded, searched against the vector store, and relevant context is retrieved and injected into the prompt sent to the AI model.",
      },
      {
        title: "Real-time Communication",
        description: "WebSockets facilitate real-time features. The frontend's `WebSocketCore` manages connections and message handling, including queuing during disconnections. The backend's `WebSocketService` handles connection authentication, message routing, and streams AI responses back to the client.",
      }
    ]
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
    title: 'Agentic Sales Deck Generator (POC)',
    subtitle: 'A LangGraph-based workflow for automated strategic analysis and presentation generation',
    period: 'January 2024 - March 2024',
    overview: 'Developed a Proof of Concept (POC) for an advanced agentic workflow using the LangGraph framework. This system orchestrates multiple AI agents, powered by models like Gemini Pro and GPT-4o via SAP AI Core, to perform a sequence of strategic analysis tasks. It starts with classifying a company\'s industry, researches strategic priorities, identifies key executives (CXOs), analyzes their objectives and pain points, and finally generates a tailored PowerPoint sales presentation. The POC demonstrated the feasibility of automating complex research and content creation. Note: This POC is currently being redeveloped by our team into an MVP.',
    challenge: 'Sales and strategy teams spent considerable time manually researching companies, identifying key stakeholders, understanding their priorities, and creating customized presentations. This process was time-consuming, prone to inconsistencies, and difficult to scale, especially when needing to incorporate insights from vast amounts of internal documentation.',
    approach: [
      'Designed a modular architecture using Python with the asynchronous Quart web framework and LangGraph for workflow orchestration.',
      'Built a multi-step analysis pipeline orchestrated by LangGraph:',
      '  - 1. Industry Classification: Determines the company\'s industry, using AI and web search fallback.',
      '  - 2. Strategic Priority Analysis: Conducts automated web research to identify key strategic goals, ranking sources for credibility.',
      '  - 3. CXO Identification: Extracts relevant executives and normalizes their roles.',
      '  - 4. CXO Objectives Analysis: Generates likely objectives for identified CXOs based on research and strategic context.',
      '  - 5. CXO Pain Points Analysis: Uses vector search across internal knowledge bases to find relevant pain points associated with the CXO\'s role and industry.',
      '  - 6. Presentation Generation: Dynamically creates PowerPoint slides using predefined templates and the gathered insights.',
      'Leveraged SAP AI Core to seamlessly integrate and utilize multiple LLMs (Gemini Pro, GPT-4o, Claude) for different reasoning and generation tasks within the workflow.',
      'Implemented efficient vector search across multiple collections in SAP HANA Cloud. Vectorized over 10,000 chunks of data related to common business pain points, end-to-end processes, and solution capabilities to provide deep, context-aware retrieval.',
      'Developed an event-driven notification system using WebSockets to provide real-time updates on the workflow progress to the user interface.'
    ],
    outcomes: [
      'Successfully demonstrated the feasibility of using a LangGraph agentic workflow for automated strategic analysis and presentation generation (POC).',
      'Reduced estimated time for deck creation from hours to minutes in test scenarios.',
      'Showcased integration with multiple LLMs via SAP AI Core for specialized tasks.',
      'Validated the use of vector search across 10,000+ vectorized chunks in HANA DB for relevant internal knowledge retrieval.',
      'Proved the concept of dynamic PowerPoint generation based on workflow outputs.',
      'The successful POC has led to the initiation of an MVP development phase by the team.'
    ],
    technologies: [
      'Python', 'LangGraph', 'Quart (ASGI)', 'asyncio', 'WebSockets',
      'SAP AI Core', 'SAP HANA Cloud (Vector DB)',
      'Gemini Pro', 'GPT-4o', 'Claude', 
      'Vector Embeddings', 'Semantic Search', 'Web Scraping',
      'PowerPoint Generation', 'HTML', 'CSS', 'JavaScript' 
    ],
    architectureDescription: 'The system employs a modular, event-driven architecture centered around a LangGraph workflow, designed for asynchronous processing and real-time updates:',
    architecturePoints: [
      'Modular Components: Clear separation between core capabilities (AI model interaction, vector search, web research) and the specific analysis steps.',
      'LangGraph Workflow: Orchestrates the multi-step analysis pipeline, managing state and transitions between tasks like classification, research, analysis, and generation.',
      'Event-Driven Updates: Uses an internal event system feeding into WebSockets, allowing the frontend to display real-time progress without polling.',
      'Asynchronous Backend: Built with Quart and asyncio to handle potentially long-running AI and research tasks efficiently.',
      'Vector Knowledge Base: Leverages SAP HANA Cloud\'s vector capabilities, storing over 10,000 embedded data chunks across collections for pain points, processes, and solutions.',
      'Multi-Model AI Integration: Flexible integration with various LLMs through SAP AI Core for optimal task performance.'
    ],
    roles: ['Concept Development', 'Architecture Design', 'Implementation Lead'],
    implementation: [
      {
        title: "LangGraph Workflow Engine & Analysis Pipeline",
        description: "The core logic resides in a LangGraph workflow. This stateful graph defines the sequence of analysis: starting with company/industry context, progressing through web research for strategic priorities, identifying key executives, analyzing their potential objectives and relevant pain points (using vector search), and culminating in the automated generation of a PowerPoint deck. Each step is an asynchronous Python function.",
        imagePath: agenticSalesImage1
      },
      {
        title: "Real-Time Frontend Communication",
        description: "To provide users with live progress updates, the backend utilizes an event-driven approach. As the LangGraph workflow progresses through each analysis step, it emits status events. These events are broadcast via WebSockets to the connected frontend (built with HTML, CSS, JavaScript), allowing the UI to reflect the current stage and display generated insights without needing to refresh.",
        imagePath: agenticSalesImage2
      },
      {
        title: "Foundation Services & Modularity",
        description: "The architecture emphasizes reusability. Core functionalities like interacting with AI models via SAP AI Core, performing vector searches in HANA Cloud, and conducting web research are encapsulated in foundational modules. The specific analysis steps (like classifying industry or identifying CXO pain points) utilize these services, promoting cleaner code and easier maintenance."
      },
      {
        title: "Vector Search for Contextual Insights",
        description: "A key technique employed was semantic search using vector embeddings stored in SAP HANA Cloud. Over 10,000 chunks of internal data (covering common business pain points, standard processes, and solution details) were vectorized. This allowed the workflow to retrieve highly relevant, context-specific information – for example, identifying likely pain points for a CFO in the manufacturing sector – far beyond simple keyword matching."
      }
    ]
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
      className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-theme-secondary/30 scrollbar-track-transparent hover:scrollbar-thumb-theme-secondary/50 transition-colors duration-200"
    >
      {/* Subtle back button at the top - Increased z-index */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              {/* Overview Text */}
              {projectId === 'project1' && (
                  <>
                    <p className="text-lg leading-relaxed mb-4">
                      Working on this project presented a unique opportunity to blend cutting-edge AI technologies with practical business requirements. The implementation leveraged the robust infrastructure provided by SAP BTP while addressing real enterprise needs for secure and efficient document processing.
                    </p>
                    <p className="text-lg leading-relaxed">
                      The resulting system balances performance and usability, giving users powerful RAG capabilities without requiring in-depth AI knowledge. This approach has proven particularly valuable for teams dealing with large volumes of technical documentation and knowledge management challenges.
                    </p>
                  </>
               )}
               {projectId === 'project3' && (
                    <p className="text-lg leading-relaxed mb-4">
                        This Proof of Concept explored the automation potential of agentic workflows using LangGraph. By chaining together specialized AI agents, each leveraging different foundation services like vector search or web research, the system could perform complex analysis tasks autonomously, significantly reducing manual effort.
                    </p>
               )}
            </div>
            <div className="bg-theme-card rounded-lg shadow-sm border border-theme/10 overflow-hidden p-4 min-h-[450px] flex items-center justify-center">
              {/* Replace Mermaid diagrams with placeholder for all projects */}
              <div className="w-full h-full flex items-center justify-center text-theme-secondary italic">
                [ Architecture Diagram Placeholder ]
              </div>
            </div>
          </div>
          
          <p className="text-lg mb-4">{project.architectureDescription}</p>
          
          <ul className="list-disc list-inside space-y-2 pl-4 mb-8">
            {project.architecturePoints.map((point, index) => (
              <li key={index} className="text-lg">{point}</li>
            ))}
          </ul>
        </section>

        {/* Challenge and Approach sections side by side */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Challenge Box */}
            <div className="bg-theme-card rounded-lg shadow-sm border border-theme/10 p-6">
              <h2 className="text-2xl font-semibold mb-4 theme-gradient-text">The Challenge</h2>
              <p className="text-lg leading-relaxed mb-4">{project.challenge}</p>
              
              {/* Project-specific challenge content */}
              {projectId === 'project1' && (
                <p className="text-lg leading-relaxed">
                  Traditional document search systems couldn't understand document semantics beyond keywords, leading to information silos and inefficient knowledge retrieval. The solution needed to handle various document formats while maintaining enterprise-grade security and providing an intuitive user experience.
                </p>
              )}
              
              {projectId === 'project3' && (
                <p className="text-lg leading-relaxed">
                  The complexity of this challenge was magnified by the need to integrate multiple AI models, conduct real-time web research, maintain contextual awareness across the workflow, and ensure the final output was business-relevant and actionable for sales teams with tight timeframes.
                </p>
              )}
            </div>
            
            {/* Approach Box */}
            <div className="bg-theme-card rounded-lg shadow-sm border border-theme/10 p-6">
              <h2 className="text-2xl font-semibold mb-4 theme-gradient-text">Our Approach</h2>
              
              {/* Project-specific approach content */}
              {projectId === 'project1' && (
                <p className="text-lg leading-relaxed mb-4">
                  We developed a comprehensive RAG solution with a modular architecture that separates concerns between document processing, vector storage, and AI integration. We prioritized real-time communication, secure authentication, and an intuitive UX to ensure both technical excellence and user adoption.
                </p>
              )}
              
              {projectId === 'project3' && (
                <p className="text-lg leading-relaxed mb-4">
                  We designed an event-driven workflow using LangGraph that orchestrates specialized AI agents in a multi-step process. Each step builds on previous insights while leveraging the appropriate foundation service (web research, vector search, AI inference). The system provides real-time progress updates and handles asynchronous, potentially long-running tasks efficiently.
                </p>
              )}
              
              {/* Generic project approach */}
              {projectId !== 'project1' && projectId !== 'project3' && (
                <p className="text-lg leading-relaxed mb-4">
                  Our solution addressed these challenges through careful architecture design, technology selection, and implementation methodology focused on both immediate needs and long-term maintainability.
                </p>
              )}
              
              <div className="mt-2">
                {project.approach.slice(0, 4).map((point, index) => (
                  <p key={index} className="text-base mb-3">
                    <span className="font-medium theme-scandinavian:text-scandi-accent-primary text-accent-primary">• </span>
                    {point}
                  </p>
                ))}
                {project.approach.length > 4 && (
                  <p className="text-sm italic text-theme-secondary mt-2">
                    + {project.approach.length - 4} more strategies
                  </p>
                )}
              </div>
            </div>
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

                {section.imagePath && (
                  <div className="mt-4">
                    <img src={section.imagePath} alt={section.title} className="w-full h-auto rounded-lg" />
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

          {/* Article footer - styled bottom button like the top one */}
          <div className="mt-16 pt-8 border-t border-theme flex justify-start">
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
        </section>
      </article>
    </motion.div>
  );
};

export default ProjectDetail;
