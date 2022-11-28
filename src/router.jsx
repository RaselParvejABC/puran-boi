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
import MyProducts from './routes/MyProducts';
import PurchaseRequests from './routes/PurchaseRequests';
import MyBuyers from './routes/MyBuyers';
import AdsOnCategory from './routes/AdsOnCategory';
import MyPurchaseRequests from './routes/MyPurchaseRequests';
import AllSellers from './routes/AllSellers';
import AllBuyers from './routes/AllBuyers';
import Reports from './routes/Reports';
import Payment from './routes/Payment';

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
        path: '/ads/:categoryID',
        element: (
          <AuthenticationDarowan>
            <AdsOnCategory />
          </AuthenticationDarowan>
        ),
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
            index: true,
            element: (
              <p className="text-center text-2xl">
                Select from Menu on Above or Left.
              </p>
            ),
          },
          //Seller Routes Below
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
          {
            path: 'my-products',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="seller"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <MyProducts />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
          {
            path: 'purchase-requests',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="seller"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <PurchaseRequests />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
          {
            path: 'my-buyers',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="seller"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <MyBuyers />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
          //Buyer Routes below
          {
            path: 'my-purchase-requests',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="buyer"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <MyPurchaseRequests />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
          {
            path: 'payment/:stripeClientSecret/:purchaseRequestID',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="buyer"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <Payment />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
          //Admin Routes Below
          {
            path: 'all-sellers',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="admin"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <AllSellers />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
          {
            path: 'all-buyers',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="admin"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <AllBuyers />
                  </RoleDarowan>
                )}
              </AuthenticationDarowan>
            ),
          },
          {
            path: 'reports',
            element: (
              <AuthenticationDarowan>
                {getCurrentUserFirebaseUID => (
                  <RoleDarowan
                    neededRole="admin"
                    getCurrentUserFirebaseUID={getCurrentUserFirebaseUID}
                  >
                    <Reports />
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
