import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HerbProvider } from './contexts/HerbContext.jsx';
import { ConstitutionProvider } from './contexts/ConstitutionContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { FolderProvider } from './contexts/FolderContext.jsx';
import { DemoFolderProvider } from './contexts/DemoFolderContext.jsx';
import { UnifiedFolderProvider } from './contexts/UnifiedFolderContext.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <HerbProvider>
          <ConstitutionProvider>
            <FolderProvider>
              <DemoFolderProvider>
                <UnifiedFolderProvider>
                  <App />
                </UnifiedFolderProvider>
              </DemoFolderProvider>
            </FolderProvider>
          </ConstitutionProvider>
        </HerbProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
);
