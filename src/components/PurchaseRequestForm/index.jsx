import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import WaitDialog from '../Dialogs/WaitDialog';
import postPurchaseRequestAPI from '../../api/postPurchaseRequestAPI';

const showErrorMessage = error => {
  if (error) {
    return <p className="mt-2 text-red-500 font-bold">{error.message}</p>;
  }
  return null;
};

const PurchaseRequestForm = ({ onClose, currentUser, product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm();

  const [showWait, setShowWait] = useState(false);
  const queryClient = useQueryClient();
  const purchaseRequestMutation = useMutation({
    mutationFn: postPurchaseRequestAPI,
    onMutate: () => {
      setShowWait(true);
    },
    onSuccess: async () => {
      setShowWait(false);
      reset();
      await queryClient.invalidateQueries({
        predicate: query =>
          ['products', 'purchaseRequests', 'users', 'categories'].includes(
            query.queryKey[0]
          ),
      });
      onClose();
    },
    onError: () => {
      setShowWait(false);
    },
  });

  const handleSubmission = data => {
    data.buyerFirebaseUID = currentUser.uid;
    data.productID = product._id;
    data.status = 'submitted';
    purchaseRequestMutation.mutate(data);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-primary text-2xl font-bold">
        Purchase Request Form
      </h1>
      <p className="mt-2">
        <strong>Your Name:</strong> {currentUser.displayName}
      </p>
      <p className="mt-2">
        <strong>Your Email:</strong> {currentUser.email}
      </p>
      <p className="mt-2">
        <strong>Product Title:</strong> {product.productTitle}
      </p>
      <p className="mt-2">
        <strong>Price:</strong> {product.priceInBDT}
      </p>

      <form onSubmit={handleSubmit(handleSubmission)}>
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Phone Number
          </label>
          <input
            {...register('buyerPhone', {
              required: 'A Phone Number is required.',
            })}
            type="tel"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          {showErrorMessage(formErrors.buyerPhone)}
        </div>
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Location You want to meet at
          </label>
          <input
            {...register('buyerProposedLocation', {
              required: 'Location is required.',
              maxLength: {
                value: 100,
                message: 'Not more than 100 characters are allowed.',
              },
            })}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          {showErrorMessage(formErrors.buyerProposedLocation)}
        </div>
        <div className="mt-4">
          <input type="submit" className="btn btn-primary btn-block" />
        </div>
      </form>
      {showWait && <WaitDialog />}
    </div>
  );
};

export default PurchaseRequestForm;
