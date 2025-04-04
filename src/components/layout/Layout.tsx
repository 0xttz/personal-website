import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Simple NavLink component for styling active state
const StyledNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const isActive = useLocation().pathname === to;
  return (
    <NavLink
      to={to}
      className={`relative block text-right text-base transition-colors duration-200 ease-in-out py-3
                 ${isActive ? 'font-semibold text-accent-secondary' : 'font-medium text-text-secondary hover:text-text-primary'}`}
    >
      <span className="mr-6">{children}</span>
      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 flex items-center justify-center"> 
        <motion.div 
          className="bg-text-secondary rounded-full"
          animate={{ scale: isActive ? 1.6 : 0.8, backgroundColor: isActive ? '#6A5ACD' : '#A1887F' }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        >
          <div className="h-1.5 w-1.5"></div> 
        </motion.div>
      </span>
    </NavLink>
  );
};

// Page transition configuration
interface PageConfig {
  path: string;
  color: string;
}

const pages: PageConfig[] = [
  { path: '/', color: '#6A5ACD' },  // Purple for home
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
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Child element animation for staggered entry
const childVariants: Variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(5px)' },
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
  
  // Fix for empty page: Ensure we always show a valid page
  useEffect(() => {
    if (!isTransitioning) {
      setCurrentContent(location.pathname);
    }
  }, [location.pathname, isTransitioning]);
  
  // Handle navigation with transition overlay
  const handleNavigation = (to: string) => {
    if (to === location.pathname || isTransitioning) return;
    
    const currentIndex = pages.findIndex(page => page.path === location.pathname);
    const nextIndex = pages.findIndex(page => page.path === to);
    
    if (currentIndex !== -1 && nextIndex !== -1) {
      const newDirection = nextIndex > currentIndex ? 1 : -1;
      setDirection(newDirection);
      setTransitionColor(pages[nextIndex].color);
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
        }, 200); // Longer delay to ensure overlay fully exits after content loads
      }, 350); // Better timing coordinated with overlay animation
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextPathname, navigate]);

  // Determine direction on location change for non-intercepted routes
  useEffect(() => {
    if (!isTransitioning && location.pathname !== previousPathname) {
      const navOrder = ['/', '/projects', '/thoughts', '/recommendations'];
      const prevIndex = navOrder.indexOf(previousPathname);
      const currIndex = navOrder.indexOf(location.pathname);
      
      if (prevIndex !== -1 && currIndex !== -1) {
        setDirection(currIndex > prevIndex ? 1 : -1);
      }
      
      setPreviousPathname(location.pathname);
    }
  }, [location.pathname, previousPathname, isTransitioning]);

  // Placeholder function for toggling dark mode
  const toggleDarkMode = () => {
    console.log("Toggle dark mode - implementation needed");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-background text-text-primary py-20 px-32"> 
      <div className="flex w-full max-w-full"> 
        {/* Nav column with reduced spacing to main content */} 
        <nav className="w-72 flex-shrink-0 flex flex-col items-end pr-14 pt-8 space-y-5 sticky top-20 h-[calc(100vh-10rem)]"> 
          <div className="flex-grow w-full space-y-4">
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/projects">Projects</StyledNavLink>
            <StyledNavLink to="/thoughts">Thoughts</StyledNavLink>
            <StyledNavLink to="/recommendations">Recommendations</StyledNavLink>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="mb-4 text-xs text-text-secondary hover:text-accent-secondary transition-colors"
            title="Toggle Theme"
          >
            Toggle Theme
          </button>
        </nav>

        {/* Main content with improved shadow and rounded corners */}
        <main className="flex-1 relative overflow-hidden rounded-xl shadow-2xl"> 
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
              className="absolute inset-0 bg-card rounded-xl shadow-xl p-12 origin-center"
              style={{ minHeight: 'calc(100vh - 10rem)' }}
            >
              <motion.div className="h-full">
                <Outlet context={childVariants} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
