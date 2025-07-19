import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HerbProvider } from './contexts/HerbContext.jsx';
import { ConstitutionProvider } from './contexts/ConstitutionContext.jsx';
import { FolderProvider } from './contexts/FolderContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HerbProvider>
      <ConstitutionProvider>
        <FolderProvider>
          <App />
        </FolderProvider>
      </ConstitutionProvider>
    </HerbProvider>
  </StrictMode>
);
