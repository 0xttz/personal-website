import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaSun, FaMoon } from 'react-icons/fa';
import { SiLichess, SiGoodreads } from "react-icons/si";

// Social media links component with hover effects
const SocialBar = () => {
  return (
    <div className="absolute -left-14 top-1/3 flex flex-col gap-6 z-40">
      {[
        { icon: <FaGithub size={22} />, url: "https://github.com/lennardkaye", label: "GitHub" },
        { icon: <FaLinkedin size={22} />, url: "https://linkedin.com/in/lennardkaye", label: "LinkedIn" },
        { icon: <FaTwitter size={22} />, url: "https://x.com/lennardkaye", label: "Twitter" },
        { icon: <SiLichess size={22} />, url: "https://lichess.org/@/lennardk", label: "Lichess" },
        { icon: <SiGoodreads size={22} />, url: "https://www.goodreads.com/user/show/158337367-lennard", label: "Goodreads" }
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
          whileHover={{ scale: 1.1, x: 5 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/30 flex items-center justify-center rounded-full shadow-md z-10 text-text-secondary group-hover:text-accent-secondary transition-colors duration-300">
            {social.icon}
          </div>
          <div className="absolute left-8 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-r-full pl-4 pr-3 py-2 -z-10 opacity-0 transform -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-md whitespace-nowrap">
            <span className="text-sm font-medium text-text-primary">{social.label}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

// Stylish atmosphere control for controlling theme
const AtmosphereControl = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => {
  return (
    <motion.div 
      className="relative flex flex-col items-end space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <span className="text-xs text-text-secondary">Atmosphere</span>
      <motion.button
        onClick={onToggle}
        className="group relative w-36 h-10 overflow-hidden rounded-md"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Day-Night Gradient Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className={`absolute inset-0 opacity-${isDark ? '0' : '100'} transition-opacity duration-700 ease-in-out bg-gradient-to-r from-accent-primary/30 to-accent-secondary/40`}></div>
          <div className={`absolute inset-0 opacity-${isDark ? '100' : '0'} transition-opacity duration-700 ease-in-out bg-gradient-to-r from-indigo-900/30 to-purple-800/40`}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 flex items-center justify-between px-4 transition-transform duration-500">
          <motion.div
            animate={{ 
              opacity: isDark ? 0.2 : 1,
              scale: isDark ? 0.8 : 1,
              x: isDark ? -8 : 0
            }}
            className="text-white"
          >
            <FaSun size={18} />
          </motion.div>
          
          <motion.div
            animate={{ 
              opacity: isDark ? 1 : 0.2,
              scale: isDark ? 1 : 0.8,
              x: isDark ? 0 : 8 
            }}
            className="text-white"
          >
            <FaMoon size={18} />
          </motion.div>
        </div>
        
        {/* Text Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white mix-blend-difference">
            {isDark ? "Night Mode" : "Day Mode"}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

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
          className="bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full"
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
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  
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

  // Theme toggle function
  const toggleDarkMode = () => {
    setIsDarkTheme(!isDarkTheme);
    // Later: Implement actual dark mode toggle logic
    console.log("Theme toggled to:", !isDarkTheme ? "dark" : "light");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-background text-text-primary py-20 px-32"> 
      <div className="flex w-full max-w-full"> 
        {/* Nav column with reduced spacing to main content */} 
        <nav className="w-72 flex-shrink-0 flex flex-col items-end pr-14 pt-8 space-y-5 sticky top-20 h-[calc(100vh-10rem)]"> 
          <div className="flex-grow w-full space-y-4">
            <StyledNavLink to="/">Me</StyledNavLink>
            <StyledNavLink to="/projects">Projects</StyledNavLink>
            <StyledNavLink to="/thoughts">Thoughts</StyledNavLink>
            <StyledNavLink to="/recommendations">Recommendations</StyledNavLink>
          </div>
          <div className="mb-4 flex justify-end">
            <AtmosphereControl isDark={isDarkTheme} onToggle={toggleDarkMode} />
          </div>
        </nav>

        {/* Main content with improved shadow and rounded corners */}
        <main className="flex-1 relative overflow-hidden rounded-xl shadow-2xl"> 
          {/* Social media sidebar - positioned relative to main */}
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
              className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/100 rounded-xl shadow-xl p-12 origin-center"
              style={{ minHeight: 'calc(100vh - 10rem)' }}
            >
              <motion.div className="h-full">
                <Outlet context={{ childVariants, HeadingStyles, GradientStyles }} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
