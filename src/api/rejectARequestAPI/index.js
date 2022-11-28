import axios from 'axios';

const rejectARequestAPI = async ({ purchaseRequestID }) => {
  const { data } = await axios.patch(
    `${
      import.meta.env.VITE_puranBoiServer
    }/purchase-requests/reject/${purchaseRequestID}`
  );
  return data;
};

export default rejectARequestAPI;
