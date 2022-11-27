import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getRecentAdsAPI from '../../api/getRecentAdsAPI';
import MySpinnerDottedOnCenter from '../Spinners/MySpinnerDottedOnCenter';
import AdCard from '../AdCard';

const RecentAds = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['products', 'ads', 'recent'],
    queryFn: getRecentAdsAPI,
  });

  if (error) {
    console.error(error);
  }

  console.log('Recent Ad', data);

  return (
    <section className="container mx-auto p-6">
      {error && (
        <p className="text-warning mx-auto text-xl my-8">
          Error while loading Recent Ads. Please, reload the page!
        </p>
      )}
      {!error && isLoading && <MySpinnerDottedOnCenter size={50} />}
      {!error && !isLoading && data.length > 0 && (
        <>
          <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
            Recent Ads
          </h1>
          <section className="grid lg:grid-cols-3 gap-8">
            {data.map(ad => (
              <AdCard key={ad._id} ad={ad}></AdCard>
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default RecentAds;
