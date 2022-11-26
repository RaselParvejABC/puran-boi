import React from 'react';
import RecentAds from '../../components/RecentAds';
import Banner from '../../components/Banner';
import CategoriesOnHome from '../../components/CategoriesOnHome';
import PublicStats from '../../components/PublicStats';

const Home = () => {
  return (
    <>
      <Banner />
      <RecentAds />
      <CategoriesOnHome />
      <PublicStats />
    </>
  );
};

export default Home;
