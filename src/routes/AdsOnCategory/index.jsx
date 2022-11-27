import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getAdsUnderCategoryAPI from '../../api/getAdsUnderCategoryAPI';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import AdCard from '../../components/AdCard';

const AdsOnCategory = () => {
  const { categoryID } = useParams();
  console.log('CategoryID', categoryID);
  const { isLoading, error, data } = useQuery({
    queryKey: ['products', 'ads', categoryID],
    queryFn: () => getAdsUnderCategoryAPI(categoryID),
  });

  if (error) {
    return (
      <p className="text-warning mx-auto text-xl my-8">
        Error while loading. Please, reload the page!
      </p>
    );
  }

  if (isLoading) {
    return <MySpinnerDottedOnCenter size={70} />;
  }

  const { products } = data;

  if (products.length === 0) {
    return (
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        No products yet in this category.
      </h1>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        {`Category: ${data.title}`}
      </h1>
      {products.length === 0 && (
        <h1 className="text-center text-lg font-black text-secondary my-6 lg:mb-6">
          No products now in this category.
        </h1>
      )}
      {products.length !== 0 && (
        <div className="grid gap-8 lg:grid-cols-3">
          {products.map(product => (
            <AdCard key={product._id} ad={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsOnCategory;
