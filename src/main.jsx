import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FirebaseAuthContextProvider from './contexts/FirebaseAuthContextProvider';
import router from './router';
import './main.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <PhotoProvider>
        <QueryClientProvider client={queryClient}>
          <FirebaseAuthContextProvider>
            <RouterProvider router={router} />
            <ToastContainer autoClose={5000} position="bottom-right" />
          </FirebaseAuthContextProvider>
        </QueryClientProvider>
      </PhotoProvider>
    </Elements>
  </React.StrictMode>
);
