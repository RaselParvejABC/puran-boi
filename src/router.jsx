import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import ErrorPage from './components/ErrorPage';
import Home from './routes/Home';
import Login from './routes/Login';

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
    ],
  },
]);

export default router;
