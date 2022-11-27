import React, { useContext } from 'react';
import { Table } from 'react-daisyui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import getMyProductsAPI from '../../api/getMyProductsAPI';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';

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

  console.log(myProducts);
  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        My Products
      </h1>
      <div className="overflow-x-scroll w-screen -mx-8">
        <Table zebra className="mx-0">
          <Table.Head>
            <span />
            <span>Name</span>
            <span>Job</span>
            <span>Favorite Color</span>
          </Table.Head>

          <Table.Body>
            <Table.Row hover>
              <span>1</span>
              <span>Cy Ganderton</span>
              <span>Quality Control Specialist</span>
              <span>Blue</span>
            </Table.Row>

            <Table.Row hover>
              <span>2</span>
              <span>Hart Hagerty</span>
              <span>Desktop Support Technician</span>
              <span>Purple</span>
            </Table.Row>

            <Table.Row hover>
              <span>3</span>
              <span>Brice Swyre</span>
              <span>Tax Accountant</span>
              <span>Red</span>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default MyProducts;
