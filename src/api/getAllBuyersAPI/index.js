import axios from 'axios';

const getAllBuyersAPI = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/users/all-buyers`,
    { withCredentials: true }
  );
  return data;
};

export default getAllBuyersAPI;
