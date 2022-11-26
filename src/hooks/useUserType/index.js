import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useUserType = firebaseUID => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users', 'type', firebaseUID],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_puranBoiServer}/users/:firebaseUID/type`
      );
      return data.userType;
    },
  });

  return { loading: isLoading, error, userType: data };
};

export default useUserType;
