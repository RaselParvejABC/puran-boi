import axios from 'axios';

const acceptARequestAPI = async ({ purchaseRequestID, productID }) => {
  const { data } = await axios.patch(
    `${
      import.meta.env.VITE_puranBoiServer
    }/purchase-requests/accept/${purchaseRequestID}/product/${productID}`
  );
  return data;
};

export default acceptARequestAPI;
