import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Import project images
import ragImage1 from '../assets/projects/rag1.png';
import ragImage2 from '../assets/projects/rag2.png';
import agenticSalesImage1 from '../assets/projects/agentic-sales1.png';
import agenticSalesImage2 from '../assets/projects/agentic-sales2.png';
import ragMermaidPng from '../assets/projects/rag_mermaid.png';
import dataMermaidPng from '../assets/projects/data_mermaid.png';
import dataImage1 from '../assets/projects/data1.png';
import dataImage2 from '../assets/projects/data2.png';
import dataImage3 from '../assets/projects/data3.png';

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
    layout?: string;
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
  'ai-playground': {
    title: 'GenAI Playground with Retrieval Augmented Generation',
    subtitle: 'A secure, enterprise-ready AI playground built on SAP Business Technology Platform (BTP)',
    period: 'October 2024 - Present (Ongoing)',
    overview:
      "A common yet effective way to showcase full-stack development skills is through building an AI playground. Leveraging my access to a global SAP Business Technology Platform (BTP) account through my study job, I undertook this project to create a practical and secure application for my team. The goal was to develop an enterprise-ready environment where business users could utilize generative AI without compromising data privacy, streamlining their workflows. This involved integrating a Python Flask backend, a React TypeScript frontend, and SAP HANA Cloud's Vector Engine for Retrieval Augmented Generation (RAG). As my first major deployment on enterprise-grade infrastructure, navigating SAP BTP and deploying services using Cloud Foundry was a significant learning curve, teaching me invaluable skills in cloud-native application management. A key requirement was ensuring all data processing, including interactions with state-of-the-art models from OpenAI (GPT-4o), Anthropic (Claude 3.7 Sonnet), and Google (Gemini) via SAP AI Core, remained strictly within SAP's infrastructure. Throughout the process, I leveraged Cursor AI to accelerate development cycles and explore implementation patterns efficiently.",
    challenge: '',
    approach: [],
    outcomes: [
      'Delivered a functional and secure GenAI playground deployed on SAP BTP.',
      'Enabled users to upload documents and chat with AI models using RAG for context-aware responses.',
      'Implemented real-time feedback for document processing status and streaming AI responses via WebSockets.',
      'Ensured enterprise-grade data security and privacy by confining all data and AI processing within SAP BTP.',
      'Provided a streamlined and accessible workflow for business users to leverage generative AI.',
      'Established a foundation for ongoing development and feature enhancement.'
    ],
    technologies: [
      // Backend
      'Python', 'Flask', 'Socket.IO', 'ASGI', 'Asyncio', 'Flask-JWT-Extended',
      // Frontend
      'React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router v7', 'Zustand', 'TanStack Query v5', 'Socket.IO Client', 'Headless UI', 'Framer Motion',
      // SAP BTP & AI
      'SAP BTP', 'Cloud Foundry', 'SAP AI Core', 'SAP HANA Cloud Vector Engine',
      // LLMs
      'OpenAI API', 'Claude API', 'Gemini API',
      // General
      'JWT (RS256)', 'REST API', 'WebSockets',
    ],
    architectureDescription: 'The application follows a robust client-server model tailored for SAP BTP:',
    architecturePoints: [
      'Backend (Flask/Python): Manages business logic, data persistence (HANA Vector Engine), AI interactions (via AI Core), JWT authentication, and real-time WebSocket communication.',
      'Frontend (React/TypeScript): Modern SPA providing the UI, interacting with the backend via REST API and WebSockets. Uses Zustand and TanStack Query for state management.',
      'Real-time Layer (Socket.IO): Enables bidirectional communication for features like document processing updates and streaming AI responses.',
      'RAG Pipeline: Handles document upload, chunking, vector embedding, storage in HANA, and retrieval for context augmentation.',
      'AI Service Integration: Abstracted service layer connects to SAP AI Core, allowing flexible use of different LLMs.',
      'Deployment: Hosted on SAP BTP, utilizing Cloud Foundry for application runtime and service management.'
    ],
    roles: [],
    implementation: [
      {
        title: "Frontend: React SPA with Modern Tooling",
        description: "The frontend, built with React 18 and TypeScript using Vite, provides the user interface. While leveraging modern tools like Zustand for state management and TanStack Query for server state synchronization improved developer experience, managing the real-time state updates from WebSockets for document processing and chat streaming proved challenging. This required several rounds of refactoring the state logic and component structure (2-3 times) to achieve a stable and responsive user experience. UI components from Headless UI and animations via Framer Motion contribute to the polished interface.",
        imagePath: ragImage1
      },
      {
        title: "Backend: Asynchronous Flask API with Services",
        description: "The Python backend uses Flask with ASGI support to handle asynchronous operations efficiently, crucial for non-blocking AI calls via SAP AI Core and real-time communication through Socket.IO. Integrating these components securely, along with JWT (RS256) authentication across both REST and WebSocket endpoints, presented a significant implementation challenge within the BTP environment. Business logic is modularized into services (Auth, AI, DB, File Handling, etc.) managed by a Service Container.",
        imagePath: ragImage2
      },
      {
        title: "RAG with HANA Cloud Vector Engine",
        description: "The core RAG functionality relies on processing uploaded documents (chunking, embedding) and storing vectors in SAP HANA Cloud's Vector Engine. User queries are embedded, and a similarity search against the vector store retrieves relevant document chunks. This context is then injected into the LLM prompt, enabling the AI to answer questions based on the provided documents.",
      },
      {
        title: "Secure Multi-LLM Access via AI Core",
        description: "A critical aspect was ensuring secure access to various LLMs (GPT-4o, Claude 3.7 Sonnet, Gemini) without data leaving SAP's infrastructure. This was achieved by routing all AI interactions through SAP AI Core, which acts as a secure gateway. The backend's AI Service module abstracts these interactions.",
      }
    ]
  },
  'project2': {
    title: 'Data Transformation Platform: Proof Point & Value Driver Automation',
    subtitle: 'Automating complex customer reference analysis and mapping workflows at SAP',
    period: 'March 2024 - Present',
    overview: 'Developed as a working student project at SAP, this application tackles complex and time-intensive data processing flows previously handled manually due to PII concerns and process complexity. It automates the extraction of structured data from customer reference documents (Proof Points) and maps these points to standardized benefit statements (Value Drivers), significantly reducing manual effort while ensuring data quality through Human-in-the-Loop (HITL) validation.',
    challenge: 'Analysts previously spent over 15 hours weekly on manual processing and mapping of customer references, a process prone to inconsistency and compounded by the need to handle potentially sensitive information. Automating this while maintaining accuracy and allowing expert review was the primary challenge. The goal is to save an estimated 300-400 hours of manual labour annually.',
    approach: [
      'Implemented two core workflows using Python (Flask) and LangGraph for orchestration:',
      '  - 1. Proof Point Extraction: Downloads PDFs from an input list, uses SAP AI Core (GenAI Hub SDK with Gemini models) for structured data extraction (quotes, metrics, details), and presents results alongside the original source for user validation/correction via a web UI.',
      '  - 2. Value Driver Mapping: Takes proof point descriptions, generates embeddings via SAP AI Core, performs vector similarity search (Cosine Similarity) against 60k+ pre-populated Value Drivers in SAP HANA Cloud, filters by industry, and presents the top 5 matches for user selection in the UI.',
      'Leveraged Flask-SocketIO for real-time progress updates during processing.',
      'Designed interactive React tables (@tanstack/react-table) for efficient HITL validation and selection, incorporating confidence scores to guide user review.',
      'Utilized SAP HANA Cloud as a vector database for efficient similarity search.',
      'Ensured secure handling of data and robust backend service architecture.'
    ],
    outcomes: [
      'Developed a functional MVP automating two complex data processing workflows.',
      'Estimated potential reduction in manual effort by 80-90% for the targeted quarterly exercise.',
      'Successfully integrated SAP AI Core for advanced data extraction and embedding generation.',
      'Demonstrated efficient vector search over a large dataset (60k+ vectors) in SAP HANA Cloud.',
      'Implemented an effective HITL process with validation/selection UIs and confidence scoring.',
      'Provided real-time feedback to users via WebSockets.',
      'Initial results using Gemini models are very promising, paving the way for further development and potential production deployment.'
    ],
    technologies: [
      // Backend
      'Python', 'Flask', 'Flask-SocketIO', 'LangGraph', 'SQLAlchemy', 'hdbcli', 'pandas', 'openpyxl', 'pypdf', 'python-dotenv', 'eventlet / gevent',
      // Frontend
      'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Socket.IO Client', '@tanstack/react-table', 'react-router-dom',
      // AI/DB
      'SAP AI Core', 'SAP GenAI Hub SDK', 'SAP HANA Cloud (Vector DB)', 'Gemini API',
      // General
      'REST API', 'WebSockets', 'Vector Embeddings', 'Cosine Similarity'
    ],
    architectureDescription: 'The application employs a backend/frontend architecture designed for workflow automation, real-time updates, and human-in-the-loop validation:',
    architecturePoints: [
      'Backend (Flask/Python): Orchestrates workflows using LangGraph, handles API requests, manages WebSocket communication (Flask-SocketIO), and encapsulates business logic in services (AI Core interaction, HANA vector search, Excel processing, PDF handling).',
      'Frontend (React/TypeScript): Provides a dynamic SPA for file upload, progress monitoring, and interactive data validation/selection using TanStack Table and custom components. Communicates with the backend primarily via WebSockets.',
      'LangGraph Workflow (Proof Point): Defines the stateful graph for sequential PDF downloading, AI-powered data extraction, and data merging.',
      'Vector Search Workflow (Value Driver): Orchestrates embedding generation (AI Core), similarity search (HANA Cloud), and result presentation for user mapping.',
      'Real-time Communication (Socket.IO): Enables asynchronous updates from backend processing steps (progress, errors, data readiness) to the frontend UI.',
      'AI Integration (SAP AI Core): Centralized access point for generative AI model inference (extraction with Gemini) and text embedding generation.',
      'Vector Database (SAP HANA Cloud): Stores and provides efficient cosine similarity search capabilities for 60k+ Value Driver vectors.'
    ],
    roles: [],
    implementation: [
      {
        title: "Backend: Flask, LangGraph & Service Layer",
        description: "The Python backend uses Flask with Flask-SocketIO for real-time communication. The Proof Point extraction workflow is orchestrated using LangGraph, defining a stateful graph that calls specific backend services (Excel reading, PDF download/processing via PyPDF, AI Core for extraction, data merging). The Value Driver Mapping workflow uses dedicated services for embedding generation (AI Core) and vector search (HANA via SQLAlchemy). SocketIO events trigger workflows and relay progress.",
        imagePath: dataImage1,
        layout: 'half'
      },
      {
        title: "Frontend: React SPA with Interactive Tables & WebSockets",
        description: "Built with React, TypeScript, and Vite, the frontend provides separate UIs for each workflow, managed by React Router. A custom `useWebSocket` hook handles real-time communication for progress, errors, and data readiness events. Key components include file uploaders and interactive tables (`@tanstack/react-table`) for the Human-in-the-Loop steps: validating extracted data (Proof Point) and selecting the correct mapping (Value Driver).",
        imagePath: dataImage2,
        layout: 'half'
      },
      {
        title: "AI-Powered Processing & Vector Search",
        description: "SAP AI Core serves as the central hub for AI interactions. It's used to call Gemini models via the GenAI Hub SDK for structured data extraction from PDFs based on defined prompts. It also provides the text embedding service used in the Value Driver workflow. SAP HANA Cloud, accessed via SQLAlchemy, acts as the vector database, enabling efficient cosine similarity searches across 60k+ Value Driver vectors, filtered by industry, to find relevant matches for user proof points.",
        layout: 'full'
      },
      {
        title: "Human-in-the-Loop (HITL) Design",
        description: "To ensure accuracy despite automation, HITL is integrated at critical stages. For Proof Points, extracted data is presented in an editable table where users can make corrections, guided by confidence scores highlighted in the UI. For Value Drivers, the system presents the top 5 potential matches based on vector similarity, allowing the user to make the final selection or indicate \"No Match\", leveraging both AI suggestions and human expertise.",
        imagePath: dataImage3,
        layout: 'full'
      }
    ]
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

        {/* Project Overview Text/Points */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 theme-gradient-text">Overview</h2>
          {/* Grid for Overview Text and RAG Diagram (if applicable) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Overview Text Container - Spans 2 cols for project2 */}
            <div className={`${projectId === 'project2' ? 'md:col-span-2' : ''}`}> 
              <p className="text-lg leading-relaxed mb-4">
                {project.overview} 
              </p>
            </div>
            
            {/* RAG Diagram / Placeholder Container - Hidden for project2 */}
            {projectId !== 'project2' && (
              <div className="bg-theme-card rounded-lg shadow-sm border border-theme/10 overflow-hidden flex">
                {/* RAG Diagram */}
                {projectId === 'ai-playground' && (
                  <img src={ragMermaidPng} alt="AI Playground Architecture Diagram" className="w-full h-auto block" />
                )}
                {/* Placeholder for other projects */}
                {projectId !== 'ai-playground' && (
                   <div className="w-full h-full min-h-[300px] flex items-center justify-center text-theme-secondary italic">
                    [ Architecture Diagram ]
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Data Transformation Diagram (Full Width - Placed directly after grid for project2) */}
          {projectId === 'project2' && (
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-4 theme-gradient-text">Architecture Diagram</h3>
              <div className="mb-8 bg-theme-card rounded-lg shadow-sm border border-theme/10 overflow-hidden flex">
                <img src={dataMermaidPng} alt="Data Transformation Architecture Diagram" className="w-full h-auto block" />
              </div>
            </div>
          )}
          
          {/* Architecture Description & Points (Common to all) */}
          <p className="text-lg mb-4">{project.architectureDescription}</p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-8">
            {project.architecturePoints.map((point, index) => (
              <li key={index} className="text-lg">{point}</li>
            ))}
          </ul>
        </section>

        {/* Implementation Details */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 theme-gradient-text">Implementation</h2>
          <div className="space-y-10"> {/* Increased spacing */}
            {project.implementation.map((section, index) => (
              <div key={index} className="mb-8 clearfix"> {/* Added clearfix for floats */}
                {/* Image Container (Floated Left for Half Layout) */}
                {section.imagePath && section.layout === 'half' && (
                  <div className={`mt-1 mb-3 md:w-1/2 md:float-left md:mr-6`}>
                    <img src={section.imagePath} alt={section.title} className={`w-full h-auto rounded-lg shadow-md border border-theme/10`} />
                  </div>
                )}

                {/* Text Content Container (Handles Full Width or Beside Floated Image) */}
                <div className={`${section.layout === 'half' ? 'overflow-hidden' : ''}`}> {/* Use overflow-hidden to contain text next to float */}
                  <h3 className="text-xl font-semibold mb-3 theme-scandinavian:text-scandi-accent-primary text-accent-primary">{section.title}</h3>
                  <p className="text-lg leading-relaxed">{section.description}</p>
                </div>

                {/* Full Width Image (Displayed After Text Content) */}
                {section.imagePath && section.layout === 'full' && (
                  <div className={`mt-4 mb-3 w-full clear-both`}> {/* Added clear-both */}
                    <img src={section.imagePath} alt={section.title} className={`w-full h-auto rounded-lg shadow-md border border-theme/10 max-w-4xl mx-auto`} />
                  </div>
                )}

                {/* Code Example (Full Width, Clears Floats) */}
                {section.codeExample && (
                  <div className="bg-theme-card rounded-lg p-5 my-4 overflow-hidden clear-both"> 
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
            The project successfully delivered on its core objectives, resulting in the following key outcomes:
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
            These outcomes demonstrate the value delivered by the application. Built on a solid technical foundation, the project continues to evolve to meet emerging requirements.
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
