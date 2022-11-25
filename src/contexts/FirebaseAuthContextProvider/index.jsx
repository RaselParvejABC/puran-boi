import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseAuthInstance from '../../services/firebase/auth';
import { useSearchParams } from 'react-router-dom';

export const FirebaseAuthContext = React.createContext();

const firebaseLogOut = async () => {
  try {
    await signOut(firebaseAuthInstance);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const FirebaseAuthContextProvider = ({ children }) => {
  const [currentUser, currentUserLoading, currentUserLoadingError] =
    useAuthState(firebaseAuthInstance);

  const [userDataChanged, setUserDataChanged] = useState(false);

  useEffect(() => {
    const followUserChange = async () => {
      if (currentUserLoading || currentUserLoadingError) {
        return;
      }
      if (!currentUser) {
        try {
          let response = await axios.delete(
            `${import.meta.env.VITE_puranBoiServer}/users/revoke-token`,
            {
              withCredentials: true,
            }
          );
          if (response['data']['success'] === true)
            console.info('Token Cleared');
        } catch {
          console.info('Token not Cleared');
        }
        return;
      }

      const registrationRoleString = localStorage.getItem('registrationRole');
      const registrationRole = JSON.parse(registrationRoleString || '{}');
      console.log('Firebase User:', currentUser);

      const userData = {
        firebaseUID: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
      };
      if (
        currentUser.uid === registrationRole['uid'] &&
        registrationRole['askedRole'] === 'seller'
      ) {
        userData['isSeller'] = true;
      }

      try {
        console.log('New Sign in');
        await axios.post(
          `${import.meta.env.VITE_puranBoiServer}/users/new-sign-in`,
          userData
        );
        console.info('User Updated/Inserted.');
        localStorage.clear();
      } catch (err) {
        console.info('User Not Updated/Inserted.');
      }
    };

    followUserChange();
  }, [currentUser, userDataChanged]);

  return (
    <FirebaseAuthContext.Provider
      value={{
        firebaseAuthInstance,
        currentUser,
        currentUserLoading,
        currentUserLoadingError,
        firebaseLogOut,
        userDataChanged,
        setUserDataChanged,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthContextProvider;
