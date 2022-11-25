import React from 'react';
import AdvertisementsOnHome from '../../components/AdvertisementsOnHome';
import Banner from '../../components/Banner';
import CategoriesOnHome from '../../components/CategoriesOnHome';

const Home = () => {
  return (
    <>
      <Banner />
      <AdvertisementsOnHome />
      <CategoriesOnHome />
    </>
  );
};

export default Home;
