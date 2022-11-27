import axios from 'axios';

const getCategoriesAPI = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/stats`
  );
  return data;
};

export default getCategoriesAPI;
