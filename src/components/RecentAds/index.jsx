import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getRecentAdsAPI from '../../api/getRecentAdsAPI';
import MySpinnerDottedOnCenter from '../Spinners/MySpinnerDottedOnCenter';

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
    <section>
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
          {data.map(ad => (
            <div key={add._id}>ad.productTitle</div>
          ))}
        </>
      )}
    </section>
  );
};

export default RecentAds;
