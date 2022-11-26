import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import ErrorPage from './components/ErrorPage';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Blog from './routes/Blog';
import Dashboard from './routes/Dashboard';
import AuthenticationDarowan from './components/AuthenticationDarowan';
import RoleDarowan from './components/RoleDarowan';
import AddProduct from './routes/AddProduct';

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
      {
        path: '/dashboard',
        element: (
          <AuthenticationDarowan>
            <Dashboard />
          </AuthenticationDarowan>
        ),
        children: [
          {
            path: 'add-product',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="seller"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <AddProduct />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
