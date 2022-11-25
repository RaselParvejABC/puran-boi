import React from 'react';
import AdvertisementsOnHome from '../../components/AdvertisementsOnHome';
import Banner from '../../components/Banner';
import CategoriesOnHome from '../../components/CategoriesOnHome';
import PublicStats from '../../components/PublicStats';

const Home = () => {
  return (
    <>
      <Banner />
      <AdvertisementsOnHome />
      <CategoriesOnHome />
      <PublicStats />
    </>
  );
};

export default Home;
