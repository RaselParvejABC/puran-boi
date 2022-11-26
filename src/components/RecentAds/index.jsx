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

  return (
    <section>
      {error && (
        <p className="text-warning mx-auto text-xl my-8">
          Error while loading Recent Ads. Please, reload the page!
        </p>
      )}
      {!error && isLoading && <MySpinnerDottedOnCenter size={50} />}
      {!error && !isLoading && data.map(ad => <div key={ad}>ad</div>)}
    </section>
  );
};

export default RecentAds;
