import axios from 'axios';

const getPurchaseRequestsToMeAPI = async firebaseUID => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/purchase-requests/to/${firebaseUID}`
  );
  return data;
};

export default getPurchaseRequestsToMeAPI;
