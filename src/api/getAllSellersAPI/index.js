import axios from 'axios';

const getAllSellersAPI = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/users/all-sellers`,
    { withCredentials: true }
  );
  return data;
};

export default getAllSellersAPI;
