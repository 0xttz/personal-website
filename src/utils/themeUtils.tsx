import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Custom hook to get the correct theme-based image path
export const useThemeImage = (terracottaPath: string): string => {
  const { isScandinavian } = useTheme();
  
  // Convert terracotta path to scandinavian equivalent
  // E.g. "/assets/terracotta/image.png" → "/assets/scandinavian/image.png"
  if (isScandinavian && terracottaPath.includes('/terracotta/')) {
    return terracottaPath.replace('/terracotta/', '/scandinavian/');
  }
  
  return terracottaPath;
};

// Theme-aware image component
interface ThemeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const ThemeImage: React.FC<ThemeImageProps> = ({ src, ...props }) => {
  const themeSrc = useThemeImage(src);
  
  return <img src={themeSrc} {...props} />;
}; 