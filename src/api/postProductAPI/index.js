import axios from 'axios';

const postProductAPI = async productData => {
  const imgBBFormData = new FormData();
  imgBBFormData.append('key', import.meta.env.VITE_ImgBB_API_KEY);
  imgBBFormData.append('image', productData.productImage[0]);
  let photoURL = null;
  const imgBBResponse = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: imgBBFormData,
  });
  const imgBBResponseBody = await imgBBResponse.json();
  photoURL = imgBBResponseBody['data']['display_url'];
  productData.productImage = photoURL;

  const { data } = await axios.post(
    `${import.meta.env.VITE_puranBoiServer}/products`,
    productData
  );

  if (!data.success) {
    throw new Error();
  }
};

export default postProductAPI;
