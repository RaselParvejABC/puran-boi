import React from 'react';
import { ButtonGroup, Table, Button } from 'react-daisyui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { toast } from 'react-toastify';
import getAllReportsAPI from '../../api/getAllReportsAPI';
import deleteProductAPI from '../../api/deleteProductAPI';
import markReportResolvedAPI from '../../api/markReportResolvedAPI';
import WaitDialog from '../../components/Dialogs/WaitDialog';

const Reports = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['reports'],
    queryFn: getAllReportsAPI,
  });

  const queryClient = useQueryClient();

  const markMutation = useMutation({
    mutationFn: markReportResolvedAPI,
    onSuccess: async () => {
      toast('Marked as resolved!');
      await queryClient.invalidateQueries({
        predicate: query =>
          ['products', 'purchaseRequests', 'users', 'reports'].includes(
            query.queryKey[0]
          ),
      });
    },
    onError: () => {
      toast('Sorry! Error while trying to mark resolved.');
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: async () => {
      toast('Product Deleted!');
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
        Cannot retrieve the reports. Please, reload the page.
      </p>
    );
  }

  if (isLoading) {
    return <MySpinnerDottedOnCenter size={50} />;
  }

  if (data.length === 0) {
    return (
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        PuranBoi has no unresolved reports now.
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        All Reports
      </h1>
      <div className="overflow-x-scroll w-screen lg:w-full -mx-8 lg:mx-0">
        <Table zebra className="min-w-max mx-auto">
          <Table.Head>
            <span />
            <span>Product Title</span>
            <span>Reporter Name</span>
            <span>Reporter Email</span>
            <span>Actions</span>
          </Table.Head>

          <Table.Body>
            {data.map(
              ({
                _id,
                productID,
                product: { productTitle },
                reporter: { name, email },
              }) => (
                <Table.Row hover key={_id}>
                  <span />
                  <span>{productTitle}</span>
                  <span>{name}</span>
                  <span>{email}</span>
                  <span>
                    <ButtonGroup>
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => markMutation.mutate(_id)}
                      >
                        Mark Resolved
                      </Button>
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() => deleteMutation.mutate(productID)}
                      >
                        Delete Product
                      </Button>
                    </ButtonGroup>
                  </span>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
      {(deleteMutation.isLoading || markMutation.isLoading) && <WaitDialog />}
    </>
  );
};

export default Reports;
