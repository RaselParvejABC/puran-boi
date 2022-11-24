import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import firebaseAuthInstance from "../../services/firebase/auth";

export const FirebaseAuthContext = React.createContext();

const FirebaseAuthContextProvider = ({ children}) => {

    const [currentUser, currentUserLoading, currentUserLoadingError] = useAuthState(firebaseAuthInstance, {
    onUserChanged: async (user) => {
      if (!user) {
        await fetch(`${import.meta.env.VITE_puranBoiServer}/user/sign-out`, {
          method: "DELETE",
          credentials: "include",
        });
        return;
      }

      await fetch(
        `${import.meta.env.VITE_puranBoiServer}/user/token/${user.uid}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
    },
  });

  return (
    <FirebaseAuthContext.Provider value={{firebaseAuthInstance, currentUser, currentUserLoading, currentUserLoadingError}}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthContextProvider;