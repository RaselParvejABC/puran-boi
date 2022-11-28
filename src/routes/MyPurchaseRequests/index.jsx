import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import getMyPurchaseRequestsAPI from '../../api/getMyPurchaseRequestsAPI';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { PhotoView } from 'react-photo-view';
import { Table, ButtonGroup, Button } from 'react-daisyui';

const MyPurchaseRequests = () => {
  const { currentUser } = useContext(FirebaseAuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['products', 'purchaseRequests'],
    queryFn: () => getMyPurchaseRequestsAPI(currentUser.uid),
  });

  if (error) {
    return (
      <p className="text-center text-warning">
        PuranBoi cannot Retrieve Your Products. Please, reload the page.
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
      <h1 className="text-center text-lg font-black text-info my-6 lg:mb-6">
        Click on Product Image to Enlarge
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
                          onClick={() => advertiseMutation.mutate(_id)}
                        >
                          Pay
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
      {/* {(deleteMutation.isLoading || advertiseMutation.isLoading) && (
        <WaitDialog />
      )} */}
    </>
  );
};

export default MyPurchaseRequests;
