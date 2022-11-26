import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserType from '../../hooks/useUserType';
import MySpinnerDottedOnCenter from '../Spinners/MySpinnerDottedOnCenter';

const RoleDarowan = ({ neededRole, getCurrentUserFirebaseUID, children }) => {
  const currentUserFirebaseUID = getCurrentUserFirebaseUID();
  const navigate = useNavigate();
  const { loading, error, userType } = useUserType(currentUserFirebaseUID);

  //Exploiting the fact that
  //this Component is wrapped
  //with AuthenticationDarowan Component in Router Definition

  if (error) {
    return (
      <InformDialog
        title="Error!"
        message="Cannot confirm Authorization."
        isOpen
        onClose={() => navigate('/', { replace: true })}
      />
    );
  }

  if (loading) {
    return <MySpinnerDottedOnCenter size={70} />;
  }

  if (userType !== neededRole) {
    return (
      <InformDialog
        title="Restricted"
        message={`Required Authorization Level: ${neededRole}.`}
        isOpen
        onClose={() => navigate('/', { replace: true })}
      />
    );
  }

  return <>{children}</>;
};

export default RoleDarowan;
