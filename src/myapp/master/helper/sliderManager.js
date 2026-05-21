import api from '../../../shared/BaseApi';

export const uploadSlider = async (images) => {
  const formData = new FormData();
  images.forEach((file) => formData.append('image', file));
  const res = await api.post('/admin/upload-qr-image', formData);
  return res.data;
};