import axios from 'axios';

const getRecentAdsAPI = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/products/ads/recent`
  );
  return data;
};

export default getRecentAdsAPI;
