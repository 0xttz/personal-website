import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type ThemeType = 'terracotta' | 'scandinavian';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  isScandinavian: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('terracotta');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'terracotta' ? 'scandinavian' : 'terracotta');
  };
  
  // Store theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    if (savedTheme && (savedTheme === 'terracotta' || savedTheme === 'scandinavian')) {
      setTheme(savedTheme);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme classes to body
    if (theme === 'scandinavian') {
      document.documentElement.classList.add('theme-scandinavian');
    } else {
      document.documentElement.classList.remove('theme-scandinavian');
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme,
        isScandinavian: theme === 'scandinavian'
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 