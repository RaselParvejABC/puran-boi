import axios from 'axios';

const deleteProductAPI = async productID => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_puranBoiServer}/products/${productID}`
  );
  return data;
};

export default deleteProductAPI;
