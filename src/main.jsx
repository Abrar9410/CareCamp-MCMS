import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import Router from './routes/Router';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={Router}></RouterProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
    <ToastContainer/>
  </StrictMode>,
)
