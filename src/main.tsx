import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from '@/components/templates/error-boundary.tsx';
import App from '@/App';
import { AuthProvider } from '@/providers/auth-provider';
import { queryClient } from '@/libs/query-client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>505 Error</div>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
