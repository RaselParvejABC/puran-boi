import React from 'react';
import { Outlet } from 'react-router-dom';
import MyFooter from '../../components/MyFooter';
import MyNavBar from '../../components/MyNavBar';

const AppLayout = () => {
  return (
    <>
      <MyNavBar />
      <Outlet />
      <MyFooter />
    </>
  );
};

export default AppLayout;
