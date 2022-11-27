import axios from 'axios';

const getUserAndThisProductAPI = async (firebaseUID, productID) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_puranBoiServer
    }/users/${firebaseUID}/product/${productID}`
  );
  return data;
};

export default getUserAndThisProductAPI;
