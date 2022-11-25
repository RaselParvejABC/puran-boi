import React, { useContext, useState } from 'react';
import { Navbar, Dropdown, Menu, Button } from 'react-daisyui';
import { FaHamburger } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import MySpinnerRoundFilled from '../Spinners/MySpinnerRoundFilled';
import InformDialog from '../Dialogs/InformDialog';

const MyNavBar = () => {
  const {
    firebaseLogOut,
    currentUser,
    currentUserLoading,
    currentUserLoadingError,
  } = useContext(FirebaseAuthContext);

  const [logOutError, setLogOutError] = useState(false);

  const logOut = async () => {
    const succeeded = await firebaseLogOut();
    if (!succeeded === false) {
      setLogOutError(true);
    }
  };

  const getMenu = isHorizontal => {
    return (
      <Menu vertical={!isHorizontal} horizontal={isHorizontal}>
        <Menu.Item>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? 'underline underline-offset-4' : null
            }
          >
            Blog
          </NavLink>
        </Menu.Item>
        {currentUserLoading && (
          <Menu.Item>
            <MySpinnerRoundFilled size={25} />
          </Menu.Item>
        )}
        {!currentUserLoading && currentUserLoadingError && (
          <Menu.Item>
            <p className="text-red-900 font-bold">Reload the page.</p>
          </Menu.Item>
        )}
        {!currentUserLoading && !currentUserLoadingError && !currentUser && (
          <Menu.Item>
            <Link
              to="/login"
              className="btn btn-primary text-white btn-sm my-auto py-1 rounded-md"
            >
              Log In
            </Link>
          </Menu.Item>
        )}
        {!currentUserLoading && !currentUserLoadingError && currentUser && (
          <>
            <Menu.Item>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'underline underline-offset-4' : null
                }
              >
                Dashboard
              </NavLink>
            </Menu.Item>

            <Menu.Item>
              <Button
                size="sm"
                className="text-white border-none bg-red-600 my-auto py-1 rounded-md"
                onClick={logOut}
              >
                Log Out
              </Button>
            </Menu.Item>
          </>
        )}
      </Menu>
    );
  };

  return (
    <div className="container px-6 mx-auto">
      <Navbar className="navbar flex items-center justify-center gap-2">
        <Navbar.Start>
          <Dropdown
            className="lg:hidden mr-4"
            horizontal="center"
            vertical="middle"
          >
            <Dropdown.Toggle>
              <FaHamburger size={20} color="white" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-56">
              {getMenu(false)}
              {/* <Dropdown.Item>{menu}</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          <Link to="/" className="normal-case text-xl text-black font-black">
            PuranBoi
          </Link>
        </Navbar.Start>
        <Navbar.End>
          <div className="hidden lg:flex justify-end items-center">
            {getMenu(true)}
          </div>
        </Navbar.End>
      </Navbar>
      {logOutError && (
        <InformDialog
          title="Log Out Failed!"
          message="PuranBoi cannot Retrieve Current User State."
          isOpen={logOutError}
          onClose={() => setLogOutError(false)}
        />
      )}
    </div>
  );
};

export default MyNavBar;
