import React from "react";
import { Navbar, Dropdown, Menu } from "react-daisyui";
import {FaHamburger} from "react-icons/fa";

const MyNavBar = () => {

  const menus = [
    {
      label: "Log In",
      to: "/login"
    }
  ];

  return (
    <div className="pb-40 flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Navbar className="navbar">
        <Navbar.Start>
          <Dropdown className="lg:hidden" horizontal="center" vertical="middle">
            <Dropdown.Toggle><FaHamburger size={20}/></Dropdown.Toggle>
            <Dropdown.Menu className="w-56">
              <Dropdown.Item>A</Dropdown.Item>
              <Dropdown.Item>B</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <a className="btn btn-ghost normal-case text-xl font-bold">PuranBoi</a>
        </Navbar.Start>
        <Navbar.End>
          
        </Navbar.End>
      </Navbar>
    </div>
  );
};

export default MyNavBar;
