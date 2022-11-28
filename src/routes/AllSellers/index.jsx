import React from 'react';
import { ButtonGroup, Table, Button } from 'react-daisyui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { toast } from 'react-toastify';
import getAllSellersAPI from '../../api/getAllSellersAPI';
import verifyASellerAPI from '../../api/verifyASellerAPI';
import deleteAUserAPI from '../../api/deleteAUserAPI';
import WaitDialog from '../../components/Dialogs/WaitDialog';

const AllSellers = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllSellersAPI,
  });

  const queryClient = useQueryClient();
  const verifyMutation = useMutation({
    mutationFn: _id => verifyASellerAPI(_id),
    onSuccess: async () => {
      toast('Seller Verified');
      await queryClient.invalidateQueries({
        predicate: query =>
          ['products', 'purchaseRequests', 'users', 'reports'].includes(
            query.queryKey[0]
          ),
      });
    },
    onError: () => {
      toast('Sorry! Error occurred while trying to verify.');
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAUserAPI,
    onSuccess: async () => {
      toast('Seller Deleted!');
      await queryClient.invalidateQueries({
        predicate: query =>
          ['products', 'purchaseRequests', 'users', 'reports'].includes(
            query.queryKey[0]
          ),
      });
    },
    onError: () => {
      toast('Sorry! Error while trying to delete.');
    },
  });

  if (error) {
    return (
      <p className="text-center text-warning">
        Cannot retrieve the sellers. Please, reload the page.
      </p>
    );
  }

  if (isLoading) {
    return <MySpinnerDottedOnCenter size={50} />;
  }

  if (data.length === 0) {
    return (
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        PuranBoi has no seller now.
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        All Sellers
      </h1>
      <div className="overflow-x-scroll w-screen lg:w-full -mx-8 lg:mx-0">
        <Table zebra className="min-w-max mx-auto">
          <Table.Head>
            <span />
            <span>Name</span>
            <span>Email</span>
            <span>Actions</span>
          </Table.Head>

          <Table.Body>
            {data.map(({ _id, name, email, isVerifiedSeller }) => (
              <Table.Row hover key={_id}>
                <span />
                <span>{name}</span>
                <span>{email}</span>
                <span>
                  <ButtonGroup>
                    {!isVerifiedSeller && (
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => verifyMutation.mutate(_id)}
                      >
                        Verify
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
            ))}
          </Table.Body>
        </Table>
      </div>
      {(verifyMutation.isLoading || deleteMutation.isLoading) && <WaitDialog />}
    </>
  );
};

export default AllSellers;
