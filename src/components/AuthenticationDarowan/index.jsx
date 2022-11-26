import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import MySpinnerDottedOnCenter from '../Spinners/MySpinnerDottedOnCenter';
import InformDialog from '../../components/Dialogs/InformDialog';

const AuthenticationDarowan = ({ children }) => {
  const { currentUser, currentUserLoading, currentUserLoadingError } =
    useContext(FirebaseAuthContext);

  const location = useLocation();

  if (currentUserLoading) {
    return <MySpinnerDottedOnCenter size={50} />;
  }

  if (currentUserLoadingError) {
    return (
      <p className="text-center text-warning">
        PuranBoi cannot Retrieve Current User State. Please, Reload the Page.
      </p>
    );
  }

  if (!currentUser) {
    const from = location.pathname;
    return <Navigate to="/login" state={{ from: from }} replace />;
  }

  if (typeof children === 'function') {
    const getCurrentUserFirebaseUID = () => currentUser.uid;
    return <>{children(getCurrentUserFirebaseUID)}</>;
  }
  return <>{children}</>;
};

export default AuthenticationDarowan;
