import React from 'react';
import { Stats } from 'react-daisyui';
import { useQuery } from '@tanstack/react-query';
import MySpinnerDottedOnCenter from '../Spinners/MySpinnerDottedOnCenter';
import getStatsAPI from '../../api/getStatsAPI';

const PublicStats = () => {
  const statQuery = useQuery({
    queryKey: ['products', 'users', 'ads'],
    queryFn: getStatsAPI,
  });

  if (statQuery.error) {
    return <p className="my-8 font-bold">Some Error loading Stats</p>;
  }

  if (statQuery.isLoading) {
    return <MySpinnerDottedOnCenter size={70} />;
  }

  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        Stats
      </h1>
      <div className="shadow font-sans container mx-auto p-8 pt-0 grid md:grid-cols-3">
        <Stats.Stat className="place-items-center">
          <Stats.Stat.Item variant="title">Users</Stats.Stat.Item>
          <Stats.Stat.Item variant="value">
            {statQuery.data.numberOfUsers}
          </Stats.Stat.Item>
        </Stats.Stat>

        <Stats.Stat className="place-items-center">
          <Stats.Stat.Item variant="title">Products</Stats.Stat.Item>
          <Stats.Stat.Item variant="value">
            {statQuery.data.numberOfProducts}
          </Stats.Stat.Item>
        </Stats.Stat>

        <Stats.Stat className="place-items-center">
          <Stats.Stat.Item variant="title">Ads</Stats.Stat.Item>
          <Stats.Stat.Item variant="value">
            {statQuery.data.numberOfAds}
          </Stats.Stat.Item>
        </Stats.Stat>
      </div>
    </>
  );
};

export default PublicStats;
