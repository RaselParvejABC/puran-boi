import axios from 'axios';

const postReportAPI = async ({ firebaseUID, productID }) => {
  const { data } = await axios.post(
    `${
      import.meta.env.VITE_puranBoiServer
    }/reports/user/${firebaseUID}/product/${productID}`
  );
  return data;
};

export default postReportAPI;
