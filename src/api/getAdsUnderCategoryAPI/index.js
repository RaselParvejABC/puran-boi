import axios from 'axios';

const getAdsUnderCategoryAPI = async categoryID => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/products/ads/${categoryID}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export default getAdsUnderCategoryAPI;
