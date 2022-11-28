import React from 'react';
import { ButtonGroup, Table, Button } from 'react-daisyui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { toast } from 'react-toastify';
import getAllBuyersAPI from '../../api/getAllBuyersAPI';
import deleteAUserAPI from '../../api/deleteAUserAPI';
import WaitDialog from '../../components/Dialogs/WaitDialog';

const AllSellers = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllBuyersAPI,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteAUserAPI,
    onSuccess: async () => {
      toast('Buyer Deleted!');
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
        Cannot retrieve the buyers. Please, reload the page.
      </p>
    );
  }

  if (isLoading) {
    return <MySpinnerDottedOnCenter size={50} />;
  }

  if (data.length === 0) {
    return (
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        PuranBoi has no buyer now.
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        All Buyers
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
            {data.map(({ _id, name, email }) => (
              <Table.Row hover key={_id}>
                <span />
                <span>{name}</span>
                <span>{email}</span>
                <span>
                  <ButtonGroup>
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
      {deleteMutation.isLoading && <WaitDialog />}
    </>
  );
};

export default AllSellers;
