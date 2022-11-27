import axios from 'axios';

const advertiseProductAPI = async productID => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_puranBoiServer}/products/ads/${productID}`
  );
  return data;
};

export default advertiseProductAPI;
