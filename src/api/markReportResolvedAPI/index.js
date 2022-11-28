import axios from 'axios';

const markReportResolvedAPI = async id => {
  console.log('v called');
  const { data } = await axios.patch(
    `${import.meta.env.VITE_puranBoiServer}/reports/mark-resolved/${id}`,
    {},
    { withCredentials: true }
  );
  return data;
};

export default markReportResolvedAPI;
