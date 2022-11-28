import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import getMyPurchaseRequestsAPI from '../../api/getMyPurchaseRequestsAPI';

const MyPurchaseRequests = () => {
  const { currentUser } = useContext(FirebaseAuthContext);

  const myPurchaseRequestsQuery = useQuery({
    queryKey: ['products', 'purchaseRequests'],
    queryFn: () => getMyPurchaseRequestsAPI(currentUser.uid),
  });
  return <div>My Purchase Requests</div>;
};

export default MyPurchaseRequests;
