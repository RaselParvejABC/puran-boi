import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <section className="container p-8 mx-auto grid lg:grid-cols-2 gap-2">
      <aside>Menus</aside>
      <section>
        <Outlet />
      </section>
    </section>
  );
};

export default Dashboard;
