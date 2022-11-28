import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import getMyPurchaseRequestsAPI from '../../api/getMyPurchaseRequestsAPI';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { PhotoView } from 'react-photo-view';
import { Table, ButtonGroup, Button } from 'react-daisyui';
import { toast } from 'react-toastify';
import axios from 'axios';
import WaitDialog from '../../components/Dialogs/WaitDialog';
import { useNavigate } from 'react-router-dom';

const MyPurchaseRequests = () => {
  const { currentUser } = useContext(FirebaseAuthContext);
  const navigate = useNavigate();
  const [arrangingPayment, setArrangingPayment] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ['products', 'purchaseRequests'],
    queryFn: () => getMyPurchaseRequestsAPI(currentUser.uid),
  });

  const handlePayment = async (amount, purchaseRequestID) => {
    setArrangingPayment(true);
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_puranBoiServer
        }/purchase-requests/stripe-client-secret/${amount}`,
        { withCredentials: true }
      );
      const { stripeClientSecret } = data;
      console.log(stripeClientSecret);
      navigate(`/dashboard/payment/${stripeClientSecret}/${purchaseRequestID}`);
    } catch (err) {
      console.error(err);
      toast('Sorry, error proceeding to payment.');
    } finally {
      setArrangingPayment(false);
    }
  };

  if (error) {
    return (
      <p className="text-center text-warning">
        PuranBoi cannot Retrieve Your Purchase Requests now. Please, reload the
        page.
      </p>
    );
  }

  if (isLoading) {
    return <MySpinnerDottedOnCenter size={50} />;
  }

  if (data.length === 0) {
    return (
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        You have not requested any purchase yet.
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        My Purchase Requests
      </h1>
      <h1 className="text-center text-lg font-black my-6 lg:mb-6">
        Click on Product Image to Enlarge
      </h1>
      <h1 className="text-normal text-center my-6 lg:mb-6">
        * You can proceed to pay only after the seller has accepted your
        purchase request.
      </h1>
      <div className="overflow-x-scroll w-screen lg:w-full -mx-8 lg:mx-0">
        <Table zebra className="min-w-max mx-auto">
          <Table.Head>
            <span />
            <span>Product Title</span>
            <span>Product Image</span>
            <span>Price</span>
            <span>Request Status</span>
            <span>Actions</span>
          </Table.Head>

          <Table.Body>
            {data.map(
              ({
                _id,
                product: { productTitle, productImage, priceInBDT },
                status,
              }) => (
                <Table.Row hover key={_id}>
                  <span />
                  <span>{productTitle}</span>
                  <PhotoView src={productImage}>
                    <img src={productImage} alt="Product Image" width={30} />
                  </PhotoView>
                  <span className="block text-right">{priceInBDT}</span>
                  <span className="text-capitalize">{status}</span>
                  <span>
                    <ButtonGroup>
                      {status === 'accepted' && (
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => handlePayment(priceInBDT, _id)}
                        >
                          Proceed to Pay
                        </Button>
                      )}
                    </ButtonGroup>
                  </span>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
      {arrangingPayment && <WaitDialog />}
    </>
  );
};

export default MyPurchaseRequests;
