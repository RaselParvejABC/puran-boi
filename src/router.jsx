import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import ErrorPage from './components/ErrorPage';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Blog from './routes/Blog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
    ],
  },
]);

export default router;
