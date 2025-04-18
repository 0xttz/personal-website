import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Restored
import './theme.css' // Restored
// Removed Mermaid CSS import
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
