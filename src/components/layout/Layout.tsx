import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaSun, FaMoon } from 'react-icons/fa';
import { SiLichess, SiGoodreads } from "react-icons/si";
import { useTheme } from '../../context/ThemeContext';

// Social media links component with hover effects - moved closer to main content
const SocialBar = () => {
  const { isScandinavian } = useTheme();
  
  return (
    <div className="absolute -left-8 sm:-left-10 md:-left-11 top-1/4 sm:top-1/3 flex flex-col gap-4 sm:gap-6 z-40">
      {[
        { icon: <FaGithub size={24} className="sm:text-3xl" />, url: "https://github.com/lennardkaye", label: "GitHub" },
        { icon: <FaLinkedin size={24} className="sm:text-3xl" />, url: "https://linkedin.com/in/lennardkaye", label: "LinkedIn" },
        { icon: <FaTwitter size={24} className="sm:text-3xl" />, url: "https://x.com/lennardkaye", label: "Twitter" },
        { icon: <SiLichess size={24} className="sm:text-3xl" />, url: "https://lichess.org/@/lennardk", label: "Lichess" },
        { icon: <SiGoodreads size={24} className="sm:text-3xl" />, url: "https://www.goodreads.com/user/show/158337367-lennard", label: "Goodreads" }
      ].map((social, index) => (
        <motion.a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center"
          initial={{ x: -30 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ x: 5, scale: 1.2 }}
        >
          {/* Icon with gradient effect */}
          <div className="flex items-center justify-center relative">
            {/* Icon with gradient on hover */}
            <div className={`relative z-10 transition-all duration-300 text-theme-secondary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
              isScandinavian 
                ? 'group-hover:from-scandi-accent-primary group-hover:to-scandi-accent-secondary' 
                : 'group-hover:from-accent-primary group-hover:to-accent-secondary'
            }`}>
              {social.icon}
            </div>
          </div>
          
          {/* Label that appears on hover - hide on small screens */}
          <div className={`absolute left-6 backdrop-blur-sm rounded-r-full pl-4 sm:pl-5 pr-2 sm:pr-3 py-1 sm:py-2 -z-10 opacity-0 transform -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm whitespace-nowrap hidden sm:block ${
            isScandinavian
              ? 'bg-gradient-to-r from-scandi-accent-primary/10 to-scandi-accent-secondary/10'
              : 'bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10'
          }`}>
            <span className="text-xs sm:text-sm font-medium text-theme-primary">{social.label}</span>
          </div>
        </motion.a>
      ))}
    </div>
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
      <span className="text-xs text-theme-secondary">Atmosphere</span>
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
            {isScandinavian ? "Scandinavian" : "Terracotta"}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

// Simple NavLink component for styling active state
const StyledNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const isActive = useLocation().pathname === to;
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

// Enhanced heading styles for use throughout the app
export const HeadingStyles = {
  h1: "text-4xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent drop-shadow-sm",
  h2: "text-2xl font-semibold text-text-primary relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/3 after:h-0.5 after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary",
  subtitle: "text-lg text-text-secondary max-w-3xl leading-relaxed"
};

// Gradients for use throughout the app
export const GradientStyles = {
  primary: "from-accent-primary/20 to-accent-secondary/30",
  secondary: "from-accent-primary/30 to-accent-secondary/50",
  intense: "from-accent-primary/50 to-accent-secondary/70",
  soft: "from-accent-primary/10 to-accent-secondary/10",
  card: "from-white/40 to-white/80"
};

// Dynamic heading styles
export const useThemeStyles = () => {
  const { isScandinavian } = useTheme();
  
  return {
    headingStyles: {
      h1: `text-4xl font-bold bg-gradient-to-r ${isScandinavian 
        ? 'from-scandi-accent-primary to-scandi-accent-secondary' 
        : 'from-accent-primary to-accent-secondary'} bg-clip-text text-transparent drop-shadow-sm`,
      h2: `text-2xl font-semibold ${isScandinavian 
        ? 'bg-gradient-to-r from-scandi-accent-primary to-scandi-accent-secondary bg-clip-text text-transparent' 
        : 'bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent'} relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-1/3 after:h-0.5 after:bg-gradient-to-r ${isScandinavian 
          ? 'after:from-scandi-accent-primary after:to-scandi-accent-secondary' 
          : 'after:from-accent-primary after:to-accent-secondary'}`,
      subtitle: `text-lg ${isScandinavian 
        ? 'text-scandi-text-secondary' 
        : 'text-text-secondary'} max-w-3xl leading-relaxed`
    },
    gradientStyles: {
      primary: isScandinavian 
        ? "from-scandi-accent-primary/20 to-scandi-accent-secondary/30" 
        : "from-accent-primary/20 to-accent-secondary/30",
      secondary: isScandinavian 
        ? "from-scandi-accent-primary/30 to-scandi-accent-secondary/50" 
        : "from-accent-primary/30 to-accent-secondary/50",
      intense: isScandinavian 
        ? "from-scandi-accent-primary/50 to-scandi-accent-secondary/70" 
        : "from-accent-primary/50 to-accent-secondary/70",
      soft: isScandinavian 
        ? "from-scandi-accent-primary/10 to-scandi-accent-secondary/10" 
        : "from-accent-primary/10 to-accent-secondary/10",
      card: "from-white/40 to-white/80"
    }
  };
};

// Page navigation order - used for determining animation direction
export const NAV_ORDER = [
  { path: '/', name: 'Me', order: 1 },
  { path: '/projects', name: 'Projects', order: 2 },
  { path: '/thoughts', name: 'Thoughts', order: 3 },
  { path: '/recommendations', name: 'Recommendations', order: 4 }
];

// Page transition configuration
interface PageConfig {
  path: string;
  color: string;
}

const pages: PageConfig[] = [
  { path: '/', color: '#6A5ACD' },  // Purple for home/me
  { path: '/projects', color: '#4682B4' }, // Steel blue for projects
  { path: '/thoughts', color: '#4CAF50' }, // Green for thoughts
  { path: '/recommendations', color: '#FF7043' }, // Orange for recommendations
];

// Page transition animation with overlay
const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Child element animation for staggered entry
const childVariants: Variants = {
  initial: { opacity: 0, y: 0, filter: 'blur(5px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1]
    }
  },
  exit: { 
    opacity: 0, 
    filter: 'blur(5px)',
    transition: { 
      duration: 0.25,
      ease: "easeIn" 
    }
  }
};

// Page transition overlay variants
const overlayVariants: Variants = {
  initial: (direction: number) => ({
    y: direction > 0 ? '100%' : '-100%',
    opacity: 0.8,
  }),
  animate: {
    y: '0%',
    opacity: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    }
  },
  exit: (direction: number) => ({
    y: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    }
  })
};

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<number>(0);
  const [previousPathname, setPreviousPathname] = useState<string>(location.pathname);
  const [nextPathname, setNextPathname] = useState<string>('');
  const [transitionColor, setTransitionColor] = useState<string>('#6A5ACD');
  const [currentContent, setCurrentContent] = useState<string>(location.pathname);
  const { isScandinavian } = useTheme();
  const { headingStyles, gradientStyles } = useThemeStyles();
  
  // Helper to get page order number
  const getPageOrder = (path: string): number => {
    const page = NAV_ORDER.find(p => p.path === path);
    return page ? page.order : 0;
  };
  
  // Fix for empty page: Ensure we always show a valid page
  useEffect(() => {
    if (!isTransitioning) {
      setCurrentContent(location.pathname);
    }
  }, [location.pathname, isTransitioning]);
  
  // Handle navigation with transition overlay
  const handleNavigation = (to: string) => {
    if (to === location.pathname || isTransitioning) return;
    
    const currentOrder = getPageOrder(location.pathname);
    const nextOrder = getPageOrder(to);
    
    if (currentOrder > 0 && nextOrder > 0) {
      // Moving "up" or "down" in navigation order
      const newDirection = nextOrder > currentOrder ? 1 : -1; 
      setDirection(newDirection);
      
      // Find color for the page
      const pageConfig = pages.find(p => p.path === to);
      setTransitionColor(pageConfig?.color || '#6A5ACD');
      
      setNextPathname(to);
      setIsTransitioning(true);
    } else {
      // Fallback for unknown routes
      navigate(to);
    }
  };

  // Intercept NavLink clicks to handle custom transitions
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navLink = target.closest('a');
      
      if (navLink && navLink.hasAttribute('href') && navLink.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const to = navLink.getAttribute('href') as string;
        handleNavigation(to);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [location.pathname, isTransitioning]);

  // Complete transition after overlay animation
  useEffect(() => {
    if (isTransitioning && nextPathname) {
      // Keep the current content visible until navigation completes
      const timer = setTimeout(() => {
        navigate(nextPathname);
        setTimeout(() => {
          setIsTransitioning(false);
          setPreviousPathname(nextPathname);
          setNextPathname('');
        }, 300); // Longer delay to ensure overlay fully exits after content loads
      }, 400); // Better timing coordinated with overlay animation
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextPathname, navigate]);

  // Determine direction on location change for non-intercepted routes
  useEffect(() => {
    if (!isTransitioning && location.pathname !== previousPathname) {
      const prevOrder = getPageOrder(previousPathname);
      const currOrder = getPageOrder(location.pathname);
      
      if (prevOrder > 0 && currOrder > 0) {
        setDirection(currOrder > prevOrder ? 1 : -1);
      }
      
      setPreviousPathname(location.pathname);
    }
  }, [location.pathname, previousPathname, isTransitioning]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-theme-background text-theme-primary py-6 sm:py-10 md:py-16 lg:py-20 px-4 sm:px-8 md:px-16 lg:px-32"> 
      <div className="flex w-full max-w-full"> 
        {/* Nav column with reduced spacing to main content */} 
        <nav className="w-68 flex-shrink-0 flex flex-col items-end pr-6 sm:pr-8 md:pr-10 pt-4 sm:pt-6 md:pt-8 space-y-4 sm:space-y-5 sticky top-12 sm:top-16 md:top-20 h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)]"> 
          <div className="flex-grow w-full space-y-3 sm:space-y-4">
            <StyledNavLink to="/">Me</StyledNavLink>
            <StyledNavLink to="/projects">Projects</StyledNavLink>
            <StyledNavLink to="/thoughts">Thoughts</StyledNavLink>
            <StyledNavLink to="/recommendations">Recommendations</StyledNavLink>
          </div>
          <div className="mb-2 sm:mb-4 flex justify-end">
            <AtmosphereControl />
          </div>
        </nav>

        {/* Main content with improved shadow and rounded corners */}
        <main className="flex-1 relative overflow-hidden rounded-xl shadow-2xl"> 
          {/* Social media sidebar - positioned closer to main content */}
          <SocialBar />
          
          {/* Page transition overlay */}
          <AnimatePresence initial={false} custom={direction}>
            {isTransitioning && (
              <motion.div
                key="page-transition-overlay"
                custom={direction}
                variants={overlayVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ 
                  backgroundColor: transitionColor,
                  zIndex: 30
                }}
                className="absolute inset-0 rounded-xl"
              />
            )}
          </AnimatePresence>

          {/* Page content with AnimatePresence */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentContent}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 rounded-xl shadow-xl origin-center overflow-hidden"
              style={{ 
                minHeight: 'calc(100vh - 6rem)',
                willChange: 'transform, opacity'  // Better performance hint for the browser
              }}
            >
              <motion.div 
                className="h-full p-4 sm:p-8 md:p-12"
                initial={false}  // Content shouldn't have its own initial animation
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet context={{ childVariants, HeadingStyles: headingStyles, GradientStyles: gradientStyles }} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
