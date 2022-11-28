import React from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { stripeClientSecret, purchaseRequestID } = useParams();
  return (
    <div>
      {stripeClientSecret} <div>{purchaseRequestID}</div>
    </div>
  );
};

export default Payment;
