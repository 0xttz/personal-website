import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiLichess, SiGoodreads } from "react-icons/si";

// Path updated by user
const homeBgUrl = 'src/assets/home.png'; 

interface ContextType {
  childVariants: Variants;
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

// Component to render text with word-by-word animation
const AnimatedWords: React.FC<{ text: string | React.ReactNode; delayStart?: number }> = ({ text, delayStart = 0 }) => {
  const words = useMemo(() => {
    if (typeof text === 'string') {
      return text.split(' ');
    }
    // If ReactNode, handle differently or return as is (simplification: assume string for now)
    // A more robust solution would handle nested elements, but let's keep it simple
    console.warn("AnimatedWords currently only supports plain strings for word splitting.");
    return [text]; // Treat as one block if not string
  }, [text]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delayStart + i * 0.1 }, // Stagger words
    }),
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(2px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        type: "spring", 
        damping: 12,
        stiffness: 100,
        // duration: 0.4, ease: 'easeOut' // Alternative non-spring
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }} // Keep words flowing inline
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={wordVariants} 
          style={{ display: 'inline-block', marginRight: '0.25em' }} // Add space between words
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Home: React.FC = () => {
  const { childVariants, HeadingStyles, GradientStyles } = useOutletContext<ContextType>();
  const typingRef = useRef<HTMLHeadingElement>(null);
  const [typingComplete, setTypingComplete] = useState(false);

  const typingText = "Hey, I'm Lennard.";
  const typeSpeed = 65;
  const initialDelay = 300;
  const typingDuration = (typingText.length * typeSpeed + initialDelay) / 1000;

  useEffect(() => {
    // Typing effect for header only
    if (typingComplete || !typingRef.current) return;

    const text = typingText;
    const typingElement = typingRef.current;
    let style: HTMLStyleElement | null = null; 
    typingElement.innerText = ""; 
    let i = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    
    const typeWriter = () => {
      if (i < text.length) {
        if (i === 0) typingElement.classList.add('typing-cursor');
        typingElement.innerText += text.charAt(i);
        i++;
        timeoutId = setTimeout(typeWriter, typeSpeed);
      } else {
        typingElement.classList.remove('typing-cursor');
        typingElement.classList.add('typing-done');
        setTypingComplete(true); // Signal header typing is done
        // No longer need controls.start here
      }
    };
    
    timeoutId = setTimeout(typeWriter, initialDelay);
    
    style = document.createElement('style');
    style.innerHTML = `
      .typing-cursor::after, .typing-done::after {
        content: '|'; display: inline-block; margin-left: 4px; font-weight: 300; 
        animation: blink 0.9s step-end infinite; opacity: 1; color: var(--color-text-secondary);
      }
      .typing-done::after { animation-delay: 0.15s; }
      @keyframes blink { from, to { opacity: 1 } 50% { opacity: 0 } }
      
      /* Style for header text outline */
      .text-outline-subtle {
        -webkit-text-stroke: 1px rgba(var(--color-background-rgb), 0.3);
        paint-order: stroke fill; /* Render stroke behind fill */
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (style && document.head.contains(style)) { document.head.removeChild(style); }
      if (timeoutId) clearTimeout(timeoutId);
    };
    
  }, [typingComplete]); // Removed controls dependency

  // Paragraph content definition (keeping structure for clarity)
  const paragraphs = [
    <>Getting hands-on with ChatGPT in late '22 wasn't just interesting; it revealed a fundamental shift where AI significantly <strong className="font-bold text-accent">abstracts away layers of low-level complexity.</strong> This means <strong className="font-bold text-accent">learning and building are becoming faster, more dynamic.</strong></>,
    <>I believe this future belongs to <strong className="font-bold text-accent">technologists</strong> – people with a wide technical toolkit and the agility to adapt and build quickly using AI. Building that versatility is my current focus in life.</>,
    <>Acting on this fully, I pivoted from my business studies, moved to Copenhagen to pursue a more technical Master's, and started spending most of my time learning and building with AI.</>,
    <>Feel free to <a href="https://www.linkedin.com/in/lennard-kaye-428103196/" target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center font-medium text-primary hover:text-accent transition-colors duration-300 group"><FaLinkedin className="mr-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> connect</a>, <a href="https://x.com/0xKaramazov" target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center font-medium text-primary hover:text-accent transition-colors duration-300 group"><FaTwitter className="mr-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> discuss ideas</a>, or check out what I'm <a href="https://github.com/0xttz" target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center font-medium text-primary hover:text-accent transition-colors duration-300 group"><FaGithub className="mr-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> building</a>. I also enjoy a game of <a href="https://lichess.org/@/lfk99" target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center font-medium text-primary hover:text-accent transition-colors duration-300 group"><SiLichess className="mr-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> chess</a> or exploring new worlds on <a href="https://www.goodreads.com/user/show/184384780-lennard-kaye" target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center font-medium text-primary hover:text-accent transition-colors duration-300 group"><SiGoodreads className="mr-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> Goodreads</a>.</>
  ];

  return (
    <motion.div
      variants={childVariants} 
      initial="initial"
      animate="animate"
      exit="exit"
      layoutId="page-content"
      className={`p-16 sm:p-20 md:p-24 flex flex-col justify-start h-full overflow-hidden relative bg-gradient-to-br ${GradientStyles.primary} animate-gradient-xy`}
      style={{ backgroundImage: `url(${homeBgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    > 
      {/* Content Layer */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-10 flex-grow flex flex-col justify-center">
        {/* Header - Removed outline class */}
        <h1
          ref={typingRef}
          // Uses updated headingStyles.h1 for 3-color gradient
          className={`${HeadingStyles.h1} text-5xl md:text-6xl mb-6 min-h-[1.5em] tracking-tight`} // Removed outline class
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }} // Keep shadow as fallback/enhancement
        >
           {/* Populated by useEffect */}
        </h1>
        
        {/* Paragraph container - Animate presence of paragraphs after typing */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }} // Fade in container after typing
          className="space-y-8 text-lg md:text-xl text-text-primary leading-relaxed md:leading-loose" 
        >
          {/* Render paragraphs with word animation */}
          {paragraphs.map((p, index) => (
             <React.Fragment key={index}>
               {/* Render paragraph content directly - word animation needs more complex handling for JSX */} 
               {/* For simplicity, let's just fade them in block by block still, controlled by typingComplete */}
               <motion.p
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + index * 0.15, duration: 0.5 } }}
               >
                {p}
               </motion.p>
               {/* Re-add separators if needed between paragraphs */} 
               {index < paragraphs.length - 1 && index % 2 === 0 && (
                 <motion.hr 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1, transition: { delay: 0.3 + index * 0.15 + 0.1, duration: 0.4 } }}
                   className="border-t border-border-primary/20 w-1/4 mx-auto" 
                 />
               )}
             </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Bottom Section: Status Card */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0 }} 
        className={`relative mt-auto bg-gradient-to-br ${GradientStyles.secondary} rounded-lg p-6 shadow-md text-center overflow-hidden`} 
      >
        {/* Opacity Overlay Layer */}
        <div className="absolute inset-0 bg-black/20 z-0"></div> 
        
        {/* Content Layer */}
        <div className="relative z-10">
          <h2 className={HeadingStyles.h2}>Current Status</h2> 
          <p className="mt-3 text-white/90">
            Open to collaboration and exploring new opportunities after graduating in Spring 2025.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
