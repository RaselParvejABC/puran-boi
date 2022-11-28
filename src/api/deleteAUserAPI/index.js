import axios from 'axios';

const deleteAUserAPI = async id => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_puranBoiServer}/users/delete/${id}`,
    { withCredentials: true }
  );
  return data;
};

export default deleteAUserAPI;
