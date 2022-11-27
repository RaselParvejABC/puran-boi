import React, { useContext } from 'react';
import { Card, Button, Tooltip } from 'react-daisyui';
import { PhotoView } from 'react-photo-view';
import { format } from 'date-fns';
import { MdVerified } from 'react-icons/md';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';

const AdCard = ({ ad }) => {
  const { currentUser } = useContext(FirebaseAuthContext);
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
          {currentUser && (
            <>
              <Button color="primary">Request to Purchase</Button>
              <Button color="warning">Report to Admin</Button>
            </>
          )}
          {!currentUser && (
            <p className="text-red-600 font-bold text-center">
              You are not Logged In.
            </p>
          )}
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};

export default AdCard;
