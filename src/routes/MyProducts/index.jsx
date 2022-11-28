import React, { useContext } from 'react';
import { ButtonGroup, Table, Button } from 'react-daisyui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import getMyProductsAPI from '../../api/getMyProductsAPI';
import deleteProductAPI from '../../api/deleteProductAPI';
import advertiseProductAPI from '../../api/advertiseProductAPI';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { toast } from 'react-toastify';
import WaitDialog from '../../components/Dialogs/WaitDialog';

const getHumanReadableStatus = productPBStatus => {
  switch (productPBStatus) {
    case 'notAdvertising':
      return 'Not Advertising';
    case 'advertising':
      return 'Advertising';
    case 'awaitingPayment':
      return 'Awaiting Payment';
    default:
      return 'Sold';
  }
};
const MyProducts = () => {
  const { currentUser } = useContext(FirebaseAuthContext);
  const {
    isLoading,
    error,
    data: myProducts,
  } = useQuery({
    queryKey: ['products', 'my-products', currentUser.uid],
    queryFn: () => getMyProductsAPI(currentUser.uid),
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: async () => {
      toast('Your Product Deleted!');
      await queryClient.invalidateQueries({
        predicate: query =>
          ['products', 'reports', 'purchaseRequests'].includes(
            query.queryKey[0]
          ),
      });
    },
    onError: () => {
      toast('Sorry! Error occurred while trying to delete.');
    },
  });
  const advertiseMutation = useMutation({
    mutationFn: advertiseProductAPI,
    onSuccess: async () => {
      toast('Your Product Advertised!');
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      toast('Sorry! Error occurred while trying to advertise.');
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

  if (myProducts.length === 0) {
    return (
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        You haven't added any product yet.
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        My Products
      </h1>
      <div className="overflow-x-scroll w-screen lg:w-full -mx-8 lg:mx-0">
        <Table zebra className="min-w-max mx-auto">
          <Table.Head>
            <span />
            <span>Product Title</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </Table.Head>

          <Table.Body>
            {myProducts.map(
              ({ _id, productTitle, priceInBDT, productPBStatus }) => (
                <Table.Row hover key={_id}>
                  <span />
                  <span>{productTitle}</span>
                  <span className="block text-right">{priceInBDT}</span>
                  <span>{getHumanReadableStatus(productPBStatus)}</span>
                  <span>
                    <ButtonGroup>
                      {productPBStatus === 'notAdvertising' && (
                        <Button
                          color="success"
                          size="sm"
                          onClick={() => advertiseMutation.mutate(_id)}
                        >
                          Advertise
                        </Button>
                      )}
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() => deleteMutation.mutate(_id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </span>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
      {(deleteMutation.isLoading || advertiseMutation.isLoading) && (
        <WaitDialog />
      )}
    </>
  );
};

export default MyProducts;
