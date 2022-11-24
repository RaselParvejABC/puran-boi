import React from "react";
import { Outlet } from "react-router-dom";
import MyNavBar from "../../components/MyNavBar";

const AppLayout = () => {
  return <>
    <MyNavBar />
    <Outlet />
  </>;
};

export default AppLayout;
