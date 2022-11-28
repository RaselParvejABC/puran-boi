import React, { useContext } from 'react';
import { ButtonGroup, Table, Button } from 'react-daisyui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { toast } from 'react-toastify';
import getPurchaseRequestsToMeAPI from '../../api/getPurchaseRequestsToMeAPI';
import acceptARequestAPI from '../../api/acceptARequestAPI';
import rejectARequestAPI from '../../api/rejectARequestAPI';
import WaitDialog from '../../components/Dialogs/WaitDialog';

const PurchaseRequests = () => {
  const { currentUser } = useContext(FirebaseAuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ['products', 'purchaseRequests', currentUser.uid],
    queryFn: () => getPurchaseRequestsToMeAPI(currentUser.uid),
  });

  const queryClient = useQueryClient();
  const acceptMutation = useMutation({
    mutationFn: acceptARequestAPI,
    onSuccess: async () => {
      toast('Purchase Request Accepted');
      await queryClient.invalidateQueries({
        predicate: query =>
          ['products', 'purchaseRequests'].includes(query.queryKey[0]),
      });
    },
    onError: () => {
      toast('Sorry! Error occurred while trying to accept.');
    },
  });
  const rejectMutation = useMutation({
    mutationFn: rejectARequestAPI,
    onSuccess: async () => {
      toast('Purchase Request Rejected!');
      await queryClient.invalidateQueries({
        predicate: query =>
          ['products', 'purchaseRequests'].includes(query.queryKey[0]),
      });
    },
    onError: () => {
      toast('Sorry! Error while trying to reject.');
    },
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
        You have no purchase request now.
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        Purchase Requests for My Products
      </h1>
      <div className="overflow-x-scroll w-screen lg:w-full -mx-8 lg:mx-0">
        <Table zebra className="min-w-max mx-auto">
          <Table.Head>
            <span />
            <span>Product Title</span>
            <span>Price</span>
            <span>Buyer Name</span>
            <span>Buyer Phone</span>
            <span>Buyer Proposed Location</span>
            <span>Request Status</span>
            <span>Actions</span>
          </Table.Head>

          <Table.Body>
            {data.map(
              ({
                _id,
                status,
                buyerPhone,
                buyerProposedLocation,
                productID,
                product: { productTitle, priceInBDT, productPBStatus },
                buyer: { name: buyerName },
              }) => (
                <Table.Row hover key={_id}>
                  <span />
                  <span>{productTitle}</span>
                  <span className="block text-right">{priceInBDT}</span>
                  <span>{buyerName}</span>
                  <span>{buyerPhone}</span>
                  <span>{buyerProposedLocation}</span>
                  <span className="text-capitalize">{status}</span>
                  <span>
                    <ButtonGroup>
                      {productPBStatus === 'advertising' && (
                        <>
                          <Button
                            color="success"
                            size="sm"
                            onClick={() =>
                              acceptMutation.mutate({
                                purchaseRequestID: _id,
                                productID: productID,
                              })
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            color="warning"
                            size="sm"
                            onClick={() =>
                              rejectMutation.mutate({
                                purchaseRequestID: _id,
                              })
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </ButtonGroup>
                  </span>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
      {(acceptMutation.isLoading || rejectMutation.isLoading) && <WaitDialog />}
    </>
  );
};

export default PurchaseRequests;
