import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getCategoriesAPI from '../../api/getCategoriesAPI';
import MySpinnerDottedOnCenter from '../Spinners/MySpinnerDottedOnCenter';
import { Link } from 'react-router-dom';

const CategoriesOnHome = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAPI,
  });

  if (error) {
    return <p className="my-8 font-bold">Some Error loading Stats</p>;
  }

  if (isLoading) {
    return <MySpinnerDottedOnCenter size={70} />;
  }

  return (
    <>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        Select from Categories below to see more ads!
      </h1>
      <div className="container mx-auto p-8 grid gap-8 lg: grid-cols-3 place-content-center">
        {data.map(category => (
          <Link
            className="block w-full rounded-md bg-gray-500 text-center text-2xl font-bold text-white p-8"
            key={category._id}
            to={`/ads/${category._id}`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoriesOnHome;
