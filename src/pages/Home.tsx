import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiLichess, SiGoodreads } from "react-icons/si";

// Path updated by user
const homeBgUrl = 'src/assets/home.png'; 

// Custom font styling
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');
  
  body, .custom-font {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  .artistic-font {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, sans-serif;
  }
`;

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

// Component for the tintenstrich (brush stroke) effect
const Tintenstrich: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute z-0 opacity-90"
        style={{ 
          background: 'linear-gradient(95deg, #ec9a47 15%, #f0b06b 85%)',
          top: '-4px',
          left: '-5px',
          right: '-3px',
          bottom: '0px',
          transform: 'rotate(-0.8deg) skewX(-3deg)',
          borderRadius: '5px 10px 3px 8px',
          boxShadow: 'inset 0 0 4px rgba(236,154,71,0.2)',
          clipPath: 'polygon(2% 18%, 9% 5%, 95% 0%, 100% 75%, 92% 90%, 15% 100%, 0% 78%)'
        }}
      ></span>
      <span 
        className="absolute z-0 opacity-75"
        style={{ 
          background: 'linear-gradient(85deg, #f0b06b 20%, #ec9a47 80%)',
          top: '-1px',
          left: '-3px',
          right: '-4px',
          bottom: '-2px',
          transform: 'rotate(0.6deg) skewX(2deg)',
          borderRadius: '8px 4px 9px 5px',
          clipPath: 'polygon(3% 12%, 12% 3%, 97% 5%, 95% 88%, 88% 95%, 8% 92%, 5% 70%)'
        }}
      ></span>
    </span>
  );
};

// Enhanced social link component with hover effects
const EnhancedSocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  color: string;
  index: number;
  triggerWaveAnimation: boolean;
  isWaveActive?: boolean;
}> = ({ href, icon, children, color, index, triggerWaveAnimation, isWaveActive }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    if (triggerWaveAnimation) {
      // Start animation sequence
      const animationTimeout = setTimeout(() => {
        controls.start({
          scale: [1, 1.05, 1],
          backgroundColor: [`transparent`, `${color}10`, `transparent`],
          transition: { duration: 1.2 }
        });
      }, 300 * index); // Stagger based on index
      
      return () => clearTimeout(animationTimeout);
    }
  }, [triggerWaveAnimation, controls, index, color]);

  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="relative inline-flex items-center font-medium px-2 py-1 mx-1 group"
      animate={controls}
    >
      {/* Background glow effect */}
      <span 
        className={`absolute inset-0 rounded-md blur-sm transition-opacity duration-300 ${isWaveActive ? 'opacity-10' : 'opacity-0'} group-hover:opacity-10`}
        style={{ backgroundColor: color }}
      ></span>
      
      {/* Border highlight */}
      <span 
        className={`absolute inset-0 rounded-md transition-all duration-300 scale-105 ${isWaveActive ? 'opacity-100 scale-110' : 'opacity-0'} group-hover:opacity-100 group-hover:scale-110`}
        style={{ 
          background: `linear-gradient(130deg, transparent 20%, ${color}40 40%, ${color}20 50%, transparent 70%)`,
        }}
      ></span>
      
      {/* Icon with rotation effect */}
      <span className={`transform transition-transform duration-300 mr-1.5 ${isWaveActive ? 'scale-110 -rotate-6' : ''} group-hover:scale-110 group-hover:-rotate-6`}>
        {icon}
      </span>
      
      {/* Text with skew/rotation effect */}
      <span className={`transform transition-all duration-300 ${isWaveActive ? 'scale-105 rotate-1 skew-x-1 font-semibold' : ''} group-hover:scale-105 group-hover:rotate-1 group-hover:skew-x-1 group-hover:font-semibold`}
            style={{ 
              textShadow: `0 0 0 transparent`,
              transition: 'all 0.3s ease',
            }}
      >
        {children}
      </span>
    </motion.a>
  );
};

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
  const [triggerWaveAnimation, setTriggerWaveAnimation] = useState(false);
  const [waveActiveIndex, setWaveActiveIndex] = useState<number | null>(null);

  const typingText = "Hey, I'm Lennard";
  const typeSpeed = 65;
  const initialDelay = 300;
  const typingDuration = (typingText.length * typeSpeed + initialDelay) / 1000;

  // Add wave animation trigger after page load
  useEffect(() => {
    const startDelay = 5000;
    const waveInterval = 600; // ms between each start
    const waveDuration = 900; // ms each stays active
    let timeouts: NodeJS.Timeout[] = [];
    const triggerWave = () => {
      for (let i = 0; i < socialLinks.length; i++) {
        timeouts.push(setTimeout(() => setWaveActiveIndex(i), i * waveInterval));
        timeouts.push(setTimeout(() => setWaveActiveIndex(prev => (prev === i ? null : prev)), i * waveInterval + waveDuration));
      }
    };
    const timer = setTimeout(() => {
      setTriggerWaveAnimation(true);
      triggerWave();
    }, startDelay);
    return () => {
      clearTimeout(timer);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    // Add custom font styles to document
    const style = document.createElement('style');
    style.innerHTML = fontStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
    
  }, [typingComplete]);

  // Social link data in an array
  const socialLinks = [
    { href: "https://www.linkedin.com/in/lennard-kaye-428103196/", icon: <FaLinkedin />, text: "connect", color: "#003366" }, // dark blue
    { href: "https://x.com/0xKaramazov", icon: <FaTwitter />, text: "discuss ideas", color: "#7FDBFF" }, // light blue
    { href: "https://github.com/0xttz", icon: <FaGithub />, text: "building", color: "#8e44ad" }, // purple
    { href: "https://lichess.org/@/lfk99", icon: <SiLichess />, text: "chess", color: "#FFD700" }, // goldish
    { href: "https://www.goodreads.com/user/show/184384780-lennard-kaye", icon: <SiGoodreads />, text: "reading", color: "#27ae60" } // greenish
  ];

  // Paragraph content with updated social links using the array
  const paragraphs = [
    <>Using ChatGPT 3.5 in late '22 wasn't just exciting to me; to me it immediately revealed a fundamental shift in technology where improving genAI would increasingly <strong className="font-bold text-accent">abstract away layers of low-level complexity.</strong> As a result, <strong className="font-bold text-accent">learning and building are becoming much faster, more dynamic.</strong></>,
    <>I believe this future belongs to <Tintenstrich><strong className="font-bold">technologists</strong></Tintenstrich> – people with a wide technical skillset and the agility to create and iterate quickly using AI. Building that versatility is my current focus in life.</>,
    <>Acting on this fully, I pivoted from my business studies, moved to Copenhagen to pursue a more technical Master's, and started spending most of my time learning and building with AI.</>,
    <>Feel free to <EnhancedSocialLink href={socialLinks[0].href} icon={socialLinks[0].icon} color={socialLinks[0].color} index={0} triggerWaveAnimation={triggerWaveAnimation} isWaveActive={waveActiveIndex === 0}>{socialLinks[0].text}</EnhancedSocialLink>, <EnhancedSocialLink href={socialLinks[1].href} icon={socialLinks[1].icon} color={socialLinks[1].color} index={1} triggerWaveAnimation={triggerWaveAnimation} isWaveActive={waveActiveIndex === 1}>{socialLinks[1].text}</EnhancedSocialLink>, or check out what I'm <EnhancedSocialLink href={socialLinks[2].href} icon={socialLinks[2].icon} color={socialLinks[2].color} index={2} triggerWaveAnimation={triggerWaveAnimation} isWaveActive={waveActiveIndex === 2}>{socialLinks[2].text}</EnhancedSocialLink>. I also <br />   enjoy a game of <EnhancedSocialLink href={socialLinks[3].href} icon={socialLinks[3].icon} color={socialLinks[3].color} index={3} triggerWaveAnimation={triggerWaveAnimation} isWaveActive={waveActiveIndex === 3}>{socialLinks[3].text}</EnhancedSocialLink> and<EnhancedSocialLink href={socialLinks[4].href} icon={socialLinks[4].icon} color={socialLinks[4].color} index={4} triggerWaveAnimation={triggerWaveAnimation} isWaveActive={waveActiveIndex === 4}>{socialLinks[4].text}</EnhancedSocialLink>.</>
  ];

  return (
    <motion.div
      variants={childVariants} 
      initial="initial"
      animate="animate"
      exit="exit"
      layoutId="page-content"
      className={`custom-font p-6 sm:p-10 md:p-12 flex flex-col justify-start h-full overflow-hidden relative bg-gradient-to-br ${GradientStyles.primary} animate-gradient-xy`}
      style={{ backgroundImage: `url(${homeBgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center 60%', backgroundRepeat: 'no-repeat' }}
    > 
      {/* Content Layer */}
      <div className="relative z-10 mx-auto space-y flex-grow flex flex-col justify-center">
        {/* Header with improved positioning */}
        <h1
          ref={typingRef}
          className={`artistic-font ${HeadingStyles.h1} text-5xl md:text-6xl mb-2 min-h-[1.5em] tracking-tight ml-4 sm:ml-8 md:ml-16`}
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
        >
           {/* Populated by useEffect */}
        </h1>
        
        {/* Paragraph container with improved spacing and alignment */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
          className="artistic-font space-y-8 text-sm md:text-base text-text-primary leading-relaxed md:leading-loose" 
        >
          {/* First paragraph - Left aligned with indentation */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
            className="-ml-14 sm:-ml-10 md:-ml-6 max-w-2xl"
          >
            {paragraphs[0]}
          </motion.p>

          {/* Second paragraph - Right aligned */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.5 } }}
            className="mr-6 sm:mr-10 md:mr-16 -ml-4 sm:ml-0 text-right max-w-2xl"
          >
            {paragraphs[1]}
          </motion.p>

          {/* Third paragraph - Centered with reduced width */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
            className="-ml-16 sm:-ml-12 md:-ml-8 max-w-xl"
          >
            {paragraphs[2]}
          </motion.p>

          {/* Fourth paragraph - More to the left */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.5 } }}
            className="max-w-3xl"
            style={{ marginLeft: '-70px' }}
          >
            {paragraphs[3]}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Section: Status Card - Adjusted height and background */}
      <motion.div 
        initial={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="relative mt-auto -mx-6 sm:-mx-10 md:-mx-12 -mb-6 sm:-mb-10 md:-mb-12"
      >
        {/* Reduced padding (p-2), applied theme soft gradient, removed black overlay */}
        <div className={`relative p-2 shadow-md text-center overflow-hidden w-full rounded-t-lg bg-gradient-to-b ${GradientStyles.soft} backdrop-blur-sm border-t border-accent-primary/20`}>
          {/* Content Layer */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="artistic-font text-2xl font-semibold text-text-primary relative inline-block">
              Current Status
              <span className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"></span>
            </h2> 
            <p className="mt-2 text-theme-primary artistic-font font-medium">
              As I graduate this summer, I'm actively looking for roles between tech and business that let me further my skills while working on interesting topics.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
