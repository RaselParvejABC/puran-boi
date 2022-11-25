import React from 'react';
import Banner from '../../components/Banner';
import CategoriesOnHome from '../../components/CategoriesOnHome';
import MyFooter from '../../components/Footer';

export async function loader() {
  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}/services/count`,
    {
      method: 'GET',
    }
  );
  const responseBody = await response.json();
  return responseBody;
}

const Home = () => {
  return (
    <>
      <Banner />
      <CategoriesOnHome />
    </>
  );
};

export default Home;
