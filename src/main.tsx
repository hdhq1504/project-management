import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

import { BrowserRouter } from 'react-router';
import ErrorBoundary from '@/components/templates/error-boundary.tsx';
import App from '@/App';
import { AuthProvider } from '@/features/auth/providers/auth-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>505 Error</div>}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
