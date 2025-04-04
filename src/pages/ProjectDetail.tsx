import React from 'react';
import { useParams } from 'react-router-dom';

// Fetch project data based on ID (placeholder)
const getProjectById = (id: string | undefined) => {
  // In a real app, fetch from an API or state management
  const mockData = { 
    '1': { title: 'Full Stack Journaling App', content: 'Detailed content for Journaling App... Architecture, learnings, etc.'},
    '2': { title: 'SAP BTP RAG Playground', content: 'Detailed content for RAG Playground...'},
    '3': { title: 'Data Transformation Platform', content: 'Detailed content for Data Platform...'},
    '4': { title: 'Agentic Sales Deck Assistant', content: 'Detailed content for Sales Deck Assistant...'},
  };
  return id ? (mockData as any)[id] : null;
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjectById(projectId);

  if (!project) {
    return <div>Project not found</div>; // Or redirect
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-text-primary mb-6">{project.title}</h1>
      {/* Add Midjourney Placeholder here potentially */}
      <div className="my-8 h-64 bg-gray-200 flex items-center justify-center text-text-secondary italic">
        [ Midjourney Placeholder for Project Visual ]
      </div>
      <div className="prose prose-lg max-w-none text-text-primary">
        {/* Placeholder content - replace with actual details */}
        <p>{project.content}</p>
        <p>More details about the architecture, challenges, stack, and outcomes would go here.</p>
        {/* Consider adding images, code snippets, links */} 
      </div>
    </div>
  );
};

export default ProjectDetail;
