import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import FirebaseAuthContextProvider from './contexts/FirebaseAuthContextProvider';
import router from './router';
import "./main.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseAuthContextProvider>
      <RouterProvider router={router} />
    </FirebaseAuthContextProvider>
     
  </React.StrictMode>
)
