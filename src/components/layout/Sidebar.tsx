import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ORDER } from './Layout';

// Simple NavLink component for styling active state
const StyledNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  // Check if the current path starts with the link's path
  // Handle the base path '/' explicitly to avoid matching everything
  const isActive = to === '/' ? location.pathname === to : location.pathname.startsWith(to);
  const { isScandinavian } = useTheme();
  
  return (
    <NavLink
      to={to}
      className={`relative block text-right text-base transition-colors duration-200 ease-in-out py-3
                 ${isActive 
                   ? 'font-semibold ' + (isScandinavian ? 'text-scandi-accent-secondary' : 'text-accent-secondary')
                   : 'font-medium text-theme-secondary hover:text-theme-primary'}`}
    >
      <span className="mr-6">{children}</span>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 flex items-center justify-center"> 
        <motion.div 
          className={`rounded-full ${isScandinavian 
            ? 'bg-gradient-to-br from-scandi-accent-primary to-scandi-accent-secondary'
            : 'bg-gradient-to-br from-accent-primary to-accent-secondary'}`}
          animate={{ scale: isActive ? 1.6 : 0.8 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        >
          <div className="h-1.5 w-1.5"></div> 
        </motion.div>
      </span>
    </NavLink>
  );
};

// Stylish atmosphere control for controlling theme
const AtmosphereControl = () => {
  const { isScandinavian, toggleTheme } = useTheme();
  
  return (
    <motion.div 
      className="relative flex flex-col items-end space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <span className="text-xs text-theme-secondary">atmosphere</span>
      <motion.button
        onClick={toggleTheme}
        className="group relative w-40 h-10 overflow-hidden rounded-md"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Theme Gradient Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Terracotta Theme */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-gradient-to-r from-accent-primary/30 to-accent-secondary/40 ${isScandinavian ? 'opacity-0' : 'opacity-100'}`}></div>
          {/* Scandinavian Theme */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-gradient-to-r from-scandi-accent-primary/30 to-scandi-accent-secondary/40 ${isScandinavian ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 flex items-center justify-between px-4 transition-transform duration-500">
          <motion.div
            animate={{ 
              opacity: isScandinavian ? 0.2 : 1,
              scale: isScandinavian ? 0.8 : 1,
              x: isScandinavian ? -8 : 0
            }}
            className="text-white"
          >
            {/* Desert/Terracotta icon - simplified and larger */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </motion.div>
          
          <motion.div
            animate={{ 
              opacity: isScandinavian ? 1 : 0.2,
              scale: isScandinavian ? 1 : 0.8,
              x: isScandinavian ? 0 : 8 
            }}
            className="text-white"
          >
            {/* Forest/Scandinavian icon - simplified and larger */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 19h8a4 4 0 0 0 0-8h-1a6.5 6.5 0 1 0-13 0 4 4 0 0 0 0 8h6Z"></path>
              <path d="M12 19v3"></path>
            </svg>
          </motion.div>
        </div>
        
        {/* Text Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white mix-blend-difference">
            {isScandinavian ? "scandinavian" : "terracotta"}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <nav className="w-60 flex-shrink-0 flex flex-col items-end pr-2 sm:pr-3 md:pr-4 pt-4 sm:pt-6 md:pt-8 space-y-4 sm:space-y-5 bg-theme-background/40 backdrop-blur-sm rounded-l-xl"> 
      <div className="flex-grow w-full space-y-3 sm:space-y-4">
        {NAV_ORDER.map((item) => (
          <StyledNavLink key={item.path} to={item.path}>
            {item.name}
          </StyledNavLink>
        ))}
      </div>
      <div className="mb-2 sm:mb-4 flex justify-end">
       {/* <AtmosphereControl /> */}
      </div>
    </nav>
  );
};

export default Sidebar;
