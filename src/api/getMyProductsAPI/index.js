import axios from 'axios';

const getMyProductsAPI = async firebaseUID => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/products/my-products/${firebaseUID}`
  );
  return data;
};

export default getMyProductsAPI;
