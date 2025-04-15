import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiLichess, SiGoodreads } from "react-icons/si";
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';

// Import OverlayScrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css'; // Import base CSS

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
      // Reduced font size from text-4xl
      h1: `text-3xl font-bold bg-gradient-to-r ${isScandinavian 
        ? `from-scandi-accent-primary to-scandi-accent-secondary` 
        : `from-accent-primary to-accent-secondary`} bg-clip-text text-transparent drop-shadow-sm`,
      // Reduced font size from text-2xl
      h2: `text-xl font-semibold ${isScandinavian 
        ? 'bg-gradient-to-r from-scandi-accent-primary to-scandi-accent-secondary bg-clip-text text-transparent' 
        : 'bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent'} relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-1/3 after:h-px after:bg-gradient-to-r ${isScandinavian 
          ? 'after:from-scandi-accent-primary after:to-scandi-accent-secondary' 
          : 'after:from-accent-primary after:to-accent-secondary'}`, // Adjusted underline position/thickness
      // Reduced font size from text-lg
      subtitle: `text-base ${isScandinavian 
        ? 'text-scandi-text-secondary' 
        : 'text-text-secondary'} leading-relaxed`
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
  { path: '/', name: 'me', order: 0 },
  { path: '/projects', name: 'projects', order: 1 },
  { path: '/thoughts', name: 'thoughts', order: 2 },
  { path: '/recommendations', name: 'recommendations', order: 3 }
];

// Page transition configuration
interface PageConfig {
  path: string;
  gradient: string;
}

const pages: PageConfig[] = [
  { path: '/', gradient: 'linear-gradient(135deg, #e07a5f 0%, #9d4edd 100%)' },  // Bright terracotta to vibrant purple for home
  { path: '/projects', gradient: 'linear-gradient(135deg, #f9844a 0%, #8338ec 100%)' }, // Vibrant orange to vibrant purple for projects
  { path: '/thoughts', gradient: 'linear-gradient(135deg, #f8ad9d 0%, #4cc9f0 100%)' }, // Soft coral to bright cyan for thoughts
  { path: '/recommendations', gradient: 'linear-gradient(135deg, #ffb4a2 0%, #b5179e 100%)' }, // Peachy pink to magenta for recommendations
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
    opacity: 0.98,
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
  const [transitionGradient, setTransitionGradient] = useState<string>('linear-gradient(135deg, #e07a5f 0%, #9d4edd 100%)');
  const [currentContent, setCurrentContent] = useState<string>(location.pathname);
  const { isScandinavian } = useTheme();
  const { headingStyles, gradientStyles } = useThemeStyles();

  // Ref for the main element
  const mainRef = useRef<HTMLElement>(null);
  // State for overlay dimensions
  const [overlayStyle, setOverlayStyle] = useState({});

  // Update document title and favicon based on current route and theme
  useEffect(() => {
    const currentPath = location.pathname;
    let currentRouteName = 'Lennard Kaye'; // Default title
    
    const matchedRoute = NAV_ORDER.find(route => 
      currentPath === route.path || (route.path !== '/' && currentPath.startsWith(route.path + '/'))
    );

    if (matchedRoute) {
      currentRouteName = matchedRoute.name.toLowerCase();
    } else if (currentPath === '/') {
       const homeRoute = NAV_ORDER.find(route => route.path === '/');
       if (homeRoute) {
          currentRouteName = homeRoute.name.toLowerCase();
       }
    }
    
    document.title = currentRouteName;

    // Update Favicon
    const faviconLink = document.getElementById('favicon-link') as HTMLLinkElement | null;
    if (faviconLink) {
      const gradientId = `faviconGradient-${isScandinavian ? 'scandi' : 'terra'}`;
      const colorStop1 = isScandinavian ? '#1C3B26' : '#C87E68'; // scandi-accent-primary : accent-primary
      const colorStop2 = isScandinavian ? '#7B4F9B' : '#6A5ACD'; // scandi-accent-secondary : accent-secondary

      // Use linearGradient matching the top-left to bottom-right direction (like bg-gradient-to-br)
      const svgString = `
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${colorStop1}"/>
              <stop offset="100%" stop-color="${colorStop2}"/>
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="14" fill="url(#${gradientId})"/>
        </svg>
      `;
      const faviconDataUri = `data:image/svg+xml;base64,${btoa(svgString)}`;
      faviconLink.href = faviconDataUri;
    }

  }, [location.pathname, isScandinavian]); // Re-run on path or theme change

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
    
    // Check if navigating to a detail page (project or thought)
    const isProjectDetail = to.startsWith('/projects/') && to !== '/projects';
    const isThoughtDetail = to.startsWith('/thoughts/') && to !== '/thoughts';
    const isDetailPage = isProjectDetail || isThoughtDetail;

    if (isDetailPage) {
      // For detail pages, navigate directly without custom transition
      navigate(to);
      return; // Stop further processing
    }

    // For main pages, proceed with custom transition logic
    const currentOrder = getPageOrder(location.pathname);
    const nextOrder = getPageOrder(to);
    
    if (currentOrder !== undefined && nextOrder !== undefined) {
      const newDirection = nextOrder > currentOrder ? 1 : -1;
      setDirection(newDirection);
      
      // Set transition gradient to Beige/Orange -> Deeper Purple
      const newGradient = 'linear-gradient(135deg, #F5CBA7 0%, #A1887F 100%)'; // Beige/Orange to Deeper Purple
      setTransitionGradient(newGradient);
      
      setNextPathname(to);
      setIsTransitioning(true);
    } else {
      // Fallback for unknown or non-ordered routes (should ideally not happen for main nav)
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
      // Delay navigating to the new route until overlay is fully visible
      const timer = setTimeout(() => {
        navigate(nextPathname);
        // Only make new content visible after overlay starts to exit
        setTimeout(() => {
          setIsTransitioning(false);
          setPreviousPathname(nextPathname);
          setNextPathname('');
          // Reset scroll position of main content area
          if (mainRef.current) {
            mainRef.current.scrollTop = 0;
          }
        }, 250); // Reduced delay to make content appear earlier
      }, 350); // Reduced delay for quicker transition
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextPathname, navigate]);

  // Determine direction on location change for non-intercepted routes
  useEffect(() => {
    if (!isTransitioning && location.pathname !== previousPathname) {
      const prevOrder = getPageOrder(previousPathname);
      const currOrder = getPageOrder(location.pathname);
      
      if (prevOrder !== undefined && currOrder !== undefined) {
        // Consistent with handleNavigation logic:
        // Higher index to lower index = negative direction (up)
        // Lower index to higher index = positive direction (down)
        setDirection(currOrder > prevOrder ? 1 : -1);
      }
      
      setPreviousPathname(location.pathname);
    }
  }, [location.pathname, previousPathname, isTransitioning]);

  // Update overlay style when transition starts
  useEffect(() => {
    if (isTransitioning && mainRef.current) {
      const rect = mainRef.current.getBoundingClientRect();
      setOverlayStyle({ 
        top: `${rect.top}px`, 
        left: `${rect.left}px`, 
        width: `${rect.width}px`, 
        height: `${rect.height}px` 
      });
    }
  }, [isTransitioning]);

  return (
    <div className="flex justify-center items-center min-h-screen h-screen bg-theme-background text-theme-primary px-2 sm:px-4 md:px-8 lg:px-16">
      <div className="flex w-full h-full max-w-full max-h-[calc(100vh-1rem)] overflow-visible">
        <Sidebar />

        <main
          ref={mainRef}
          // Remove scrollbar utilities, keep overflow-hidden as OverlayScrollbars handles scroll
          className={`flex-1 relative rounded-xl shadow-2xl 
                     overflow-hidden // Hide native scrollbar completely
                     flex flex-col w-full max-w-7xl mx-auto min-w-0 h-full`}
        >
          {/* Wrap scrollable content with OverlayScrollbarsComponent */}
          <OverlayScrollbarsComponent
            element="div" // Use a div as the wrapper
            options={{
              scrollbars: {
                // theme: 'os-theme-light', // Example: Use a built-in theme or create custom
                autoHide: 'scroll', // 'move', 'leave', 'never'
                // Hide the track but show the thumb
                visibility: 'auto',
                clickScroll: true,
              },
              // Ensure content keeps padding etc.
              paddingAbsolute: true,
              // Customize appearance further if needed via className or styles
              // className: 'os-theme-minimal-dark' // Example custom theme class
            }}
            // Apply necessary layout classes to the wrapper
            className="h-full w-full flex-grow"
            defer // Defer initialization for performance
          >
            {/* All content that needs scrolling goes inside here */}
            <div className="relative flex flex-col flex-grow h-full">
              <SocialBar />

              <AnimatePresence initial={false} custom={direction}>
                {isTransitioning && (
                  <motion.div
                    key="page-transition-overlay"
                    custom={direction}
                    variants={overlayVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="fixed rounded-xl"
                    style={{
                      ...overlayStyle,
                      background: transitionGradient,
                      zIndex: 30,
                      backdropFilter: "blur(3px)",
                    }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                className="flex-1 flex flex-col p-0 m-0" // Ensure this takes up space
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: isTransitioning ? 0 : 0.1 }}
              >
                <Outlet context={{ childVariants, HeadingStyles: headingStyles, GradientStyles: gradientStyles }} />
              </motion.div>
            </div>
          </OverlayScrollbarsComponent>
        </main>
      </div>
    </div>
  );
};

export default Layout;
