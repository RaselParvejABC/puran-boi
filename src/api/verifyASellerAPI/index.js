import axios from 'axios';

const verifyASellerAPI = async id => {
  console.log('v called');
  const { data } = await axios.patch(
    `${import.meta.env.VITE_puranBoiServer}/users/verify/${id}`,
    {},
    { withCredentials: true }
  );
  return data;
};

export default verifyASellerAPI;
