import React, { useContext, useState } from 'react';
import { Navbar, Dropdown, Menu, Button } from 'react-daisyui';
import { FaHamburger } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import MySpinnerRoundFilled from '../Spinners/MySpinnerRoundFilled';

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

  return (
    <div className="container mx-auto">
      <Navbar className="navbar w-full flex items-center justify-center gap-2">
        <Navbar.Start>
          <Dropdown className="lg:hidden" horizontal="center" vertical="middle">
            <Dropdown.Toggle>
              <FaHamburger size={20} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-56">
              <Dropdown.Item>A</Dropdown.Item>
              <Dropdown.Item>B</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Link to="/" className="normal-case text-xl text-black font-black">
            PuranBoi
          </Link>
        </Navbar.Start>
        <Navbar.End>
          <div className="hidden lg:flex justify-end items-center">
            <Menu vertical={false} horizontal={true}>
              <Menu.Item>
                <Link to="/blog">Blog</Link>
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
              {!currentUserLoading &&
                !currentUserLoadingError &&
                !currentUser && (
                  <Menu.Item>
                    <Link
                      to="/login"
                      className="btn btn-primary text-white btn-sm my-auto py-1 rounded-md"
                    >
                      Log In
                    </Link>
                  </Menu.Item>
                )}
              {!currentUserLoading &&
                !currentUserLoadingError &&
                currentUser && (
                  <>
                    <Menu.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Button onClick={logOut}>Log Out</Button>
                    </Menu.Item>
                  </>
                )}
            </Menu>
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
