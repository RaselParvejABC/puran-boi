import React from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseAuthInstance from '../../services/firebase/auth';

export const FirebaseAuthContext = React.createContext();

const FirebaseAuthContextProvider = ({ children }) => {
  const [currentUser, currentUserLoading, currentUserLoadingError] =
    useAuthState(firebaseAuthInstance, {
      onUserChanged: async user => {
        console.log('Firebase User:', user);
        // if (!user) {
        //   await fetch(`${import.meta.env.VITE_puranBoiServer}/user/sign-out`, {
        //     method: 'DELETE',
        //     credentials: 'include',
        //   });
        //   return;
        // }
        // await fetch(
        //   `${import.meta.env.VITE_puranBoiServer}/user/token/${user.uid}`,
        //   {
        //     method: 'GET',
        //     credentials: 'include',
        //   }
        // );
      },
    });

  const firebaseLogOut = async () => {
    try {
      await signOut(firebaseAuthInstance);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <FirebaseAuthContext.Provider
      value={{
        firebaseAuthInstance,
        currentUser,
        currentUserLoading,
        currentUserLoadingError,
        firebaseLogOut,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthContextProvider;
