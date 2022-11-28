import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment.css';
import postPaymentAPI from '../../api/postPaymentAPI';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import WaitDialog from '../../components/Dialogs/WaitDialog';
import { toast } from 'react-toastify';

const Payment = () => {
  const { stripeClientSecret, purchaseRequestID } = useParams();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret] = useState(stripeClientSecret);
  const [showWait, setShowWait] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const queryClient = useQueryClient();
  const paymentMutation = useMutation({
    mutationFn: postPaymentAPI,
    onMutate: () => {
      setShowWait(true);
    },
    onSuccess: async () => {
      setShowWait(false);
      toast('Paid Successfully!');
      await queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'purchaseRequests',
      });
      navigate('/dashboard/my-purchase-requests');
    },
    onError: () => {
      toast('Please, contact our customer care!');
      setShowWait(false);
      navigate('/dashboard/my-purchase-requests');
    },
  });

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = async event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    console.log(payload);

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
      toast('Error processing payment!');
      navigate('/dashboard/my-purchase-requests');
    } else {
      setError(null);
      payload['purchaseRequestID'] = purchaseRequestID;
      paymentMutation.mutate(payload);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div className="overflow-x-scroll w-screen mx-0 lg:w-full lg:mx-0">
      <h1 className="text-center text-3xl font-bold text-primary mb-8">
        Payment
      </h1>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text text-white">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay Now'
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error text-red-500" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p
          className={
            succeeded ? 'result-message text-success' : 'result-message hidden'
          }
        >
          Payment succeeded
        </p>
      </form>
      {showWait && <WaitDialog />}
    </div>
  );
};

export default Payment;
