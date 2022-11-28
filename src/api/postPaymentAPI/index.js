import axios from 'axios';

const postPaymentAPI = async payment => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_puranBoiServer}/purchase-requests/payment`,
    payment,
    { withCredentials: true }
  );
  return data;
};

export default postPaymentAPI;
