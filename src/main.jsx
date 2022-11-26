import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import FirebaseAuthContextProvider from './contexts/FirebaseAuthContextProvider';
import router from './router';
import './main.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseAuthContextProvider>
        <RouterProvider router={router} />
      </FirebaseAuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
