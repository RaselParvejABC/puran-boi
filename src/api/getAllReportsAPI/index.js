import axios from 'axios';

const getAllReportsAPI = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_puranBoiServer}/reports/unresolved`,
    { withCredentials: true }
  );
  return data;
};

export default getAllReportsAPI;
