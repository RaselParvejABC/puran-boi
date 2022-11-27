import axios from 'axios';

const postPurchaseRequestAPI = async requestData => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_puranBoiServer}/purchase-requests`,
    requestData
  );
  return data;
};

export default postPurchaseRequestAPI;
