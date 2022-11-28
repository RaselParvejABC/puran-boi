import axios from 'axios';

const getMyPurchaseRequestsAPI = async firebaseUID => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_puranBoiServer
    }/purchase-requests/from/${firebaseUID}`
  );
  console.log('PR', data);
  return data;
};

export default getMyPurchaseRequestsAPI;
