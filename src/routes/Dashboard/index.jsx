import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'react-daisyui';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import useUserType from '../../hooks/useUserType';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';

const Dashboard = () => {
  const { currentUser } = useContext(FirebaseAuthContext);

  console.log('User Dashboard', currentUser);

  const { loading, error, userType } = useUserType(currentUser.uid);

  if (loading) {
    return <MySpinnerDottedOnCenter size={30} />;
  }

  if (error || !userType) {
    return (
      <p className="text-center text-warning text-2xl font-bold">
        Please Reload the Page.
      </p>
    );
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
    <section className="container p-8 w-screen mx-0 grid lg:grid-cols-5 gap-2">
      <aside className="lg:col-span-1 mx-auto lg:ml-auto">
        {dashboardMenu}
      </aside>
      <section className="lg:col-span-4">
        <Outlet />
      </section>
    </section>
  );
};

export default Dashboard;
