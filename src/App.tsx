import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Thoughts from './pages/Thoughts';
import Recommendations from './pages/Recommendations';
import ProjectDetail from './pages/ProjectDetail';
import ThoughtDetail from './pages/ThoughtDetail';
import OtherProjects from './pages/OtherProjects';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="projects/other" element={<OtherProjects />} />
          <Route path="thoughts" element={<Thoughts />} />
          <Route path="thoughts/:thoughtId" element={<ThoughtDetail />} />
          <Route path="recommendations" element={<Recommendations />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
