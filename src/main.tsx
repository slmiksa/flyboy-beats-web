
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global error handler for better debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Log when the app starts rendering
console.log('Starting application render...');

createRoot(document.getElementById("root")!).render(<App />);

// Log when the render is complete
console.log('Application render complete.');
