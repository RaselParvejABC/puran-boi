import React, { useContext, useState } from 'react';
import { Card, Button, Tooltip, Alert } from 'react-daisyui';
import { PhotoView } from 'react-photo-view';
import { format } from 'date-fns';
import { MdVerified } from 'react-icons/md';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import getUserAndThisProductAPI from '../../api/getUserAndThisProductAPI';
import postReportAPI from '../../api/postReportAPI';
import WaitDialog from '../Dialogs/WaitDialog';
import { toast } from 'react-toastify';

const AdCard = ({ ad }) => {
  const { currentUser } = useContext(FirebaseAuthContext);
  const [showWait, setShowWait] = useState(false);
  const userAndThisProductQuery = useQuery({
    queryKey: ['products', currentUser.uid, ad._id],
    queryFn: () => getUserAndThisProductAPI(currentUser.uid, ad._id),
  });

  const queryClient = useQueryClient();
  const reportMutation = useMutation({
    mutationFn: postReportAPI,
    onMutate: () => {
      setShowWait(true);
    },
    onSuccess: async () => {
      setShowWait(false);
      toast('Reported to Admin!');
      await queryClient.invalidateQueries({
        predicate: query => ['products', 'reports'].includes(query.queryKey[0]),
      });
    },
    onError: () => {
      setShowWait(false);
      toast('Sorry! Error Submitting Report.');
    },
  });

  return (
    <Card compact className="border border-gray-700 p-0">
      <PhotoView src={ad.productImage}>
        <Card.Image
          src={ad.productImage}
          alt="Product Image"
          className="mx-0 max-w-full w-full h-96 object-cover object-center"
        />
      </PhotoView>

      <Card.Body className="mx-0">
        <Card.Title tag="h2">{ad.productTitle}</Card.Title>
        <p>
          <strong>Seller Location:</strong> {ad.sellerLocation}
        </p>
        <p>
          <strong>Resale Price:</strong> {ad.priceInBDT}
        </p>
        <p>
          <strong>Original Price:</strong> {ad.originalPriceInBDT}
        </p>
        <p>
          <em>Used not more than {ad.yearsOfUse} year(s).</em>
        </p>
        <p>
          <strong>Description:</strong> {ad.productDescription}
        </p>
        <p>
          <strong>Advertised at:</strong>{' '}
          {format(new Date().setTime(ad.advertisingTimestamp), 'MMMM dd, yyyy')}
        </p>
        <div>
          <strong>Seller Name:</strong> {ad.seller.sellerName}{' '}
          {ad.seller.isSellerVerified && (
            <Tooltip message="Officially Verified Admin" color="info">
              <MdVerified style={{ color: 'blue' }} />
            </Tooltip>
          )}
        </div>
        <Card.Actions className="justify-center lg:justify-between mt-4">
          {currentUser &&
            !userAndThisProductQuery.isLoading &&
            !userAndThisProductQuery.error && (
              <>
                {!userAndThisProductQuery.data.requested ? (
                  <Button color="primary">Request to Purchase</Button>
                ) : (
                  <Button className="bg-gray-500" disabled>
                    Requested to Purchase
                  </Button>
                )}
                {!userAndThisProductQuery.data.reported ? (
                  <Button
                    color="warning"
                    onClick={() =>
                      reportMutation.mutate({
                        firebaseUID: currentUser.uid,
                        productID: ad._id,
                      })
                    }
                  >
                    Report to Admin
                  </Button>
                ) : (
                  <Button className="bg-gray-500" disabled>
                    Reported to Admin
                  </Button>
                )}
              </>
            )}
          {!currentUser && (
            <Alert status="info" className="font-bold">
              <p className="text-center">You are not Logged In.</p>
            </Alert>
          )}
        </Card.Actions>
      </Card.Body>
      {showWait && <WaitDialog />}
    </Card>
  );
};

export default AdCard;
