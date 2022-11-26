import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'react-daisyui';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import useUserType from '../../hooks/useUserType';

const Dashboard = () => {
  const { currentUser, currentUserLoading, currentUserLoadingError } =
    useContext(FirebaseAuthContext);

  console.log('User Dashboard', currentUser);

  const { loading, error, userType } = useUserType(currentUser.uid);

  if (!userType) {
    return null;
  }

  let dashboardMenu;

  if (userType === 'buyer') {
    dashboardMenu = (
      <Menu className="w-full">
        <Menu.Title>
          <span>{`${userType.toUpperCase()} Menu`}</span>
        </Menu.Title>
        <Menu.Item>
          <Link to="/dashboard/my-purchase-requests">My Purchase Requests</Link>
        </Menu.Item>
      </Menu>
    );
  }

  if (userType === 'seller') {
    dashboardMenu = (
      <Menu className="w-full">
        <Menu.Title>
          <span>{`${userType.toUpperCase()} Menu`}</span>
        </Menu.Title>
        <Menu.Item>
          <Link to="/dashboard/add-product">Add a Product</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/dashboard/my-products">My Products</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/dashboard/purchase-requests">Purchase Requests</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/dashboard/my-buyers">My Buyers</Link>
        </Menu.Item>
      </Menu>
    );
  }

  if (userType === 'admin') {
    dashboardMenu = (
      <Menu className="w-full">
        <Menu.Title>
          <span>{`${userType.toUpperCase()} Menu`}</span>
        </Menu.Title>
        <Menu.Item>
          <Link to="/dashboard/all-sellers">All Sellers</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/dashboard/all-buyers">All Buyers</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/dashboard/reports">Reports</Link>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <section className="container p-8 mx-auto grid lg:grid-cols-5 gap-2">
      <aside className="lg:col-span-1">{dashboardMenu}</aside>
      <section className="lg:col-span-4">
        <Outlet />
      </section>
    </section>
  );
};

export default Dashboard;
