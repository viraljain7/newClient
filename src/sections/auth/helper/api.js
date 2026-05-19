import api from '../../../shared/BaseApi';

export const loginUser = async (payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([k, v]) => {
    formData.append(k, v);
  });

  const res = await api.post(
    '/auth/login', // ✅ use baseURL
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data' // 🔥 IMPORTANT
      }
    }
  );

  return res.data;
};

export const logoutUser = async () => {
  const res = await api.get('/auth/logout'); // or POST if backend requires
  return res.data;
};

export const sendForgotPasswordOtpApi = async (payload) => {
  const formData = new FormData();
  formData.append('mobile', payload.mobile);
  const res = await api.post('/auth/forget-password', formData); // or POST if backend requires
  return res.data;
};

export const ForgotPasswordApi = async (payload) => {
  const formData = new FormData();
  formData.append('mobile', payload.mobile);
  formData.append('otp', payload.otp);
  formData.append('password', payload.password);

  const res = await api.post('/auth/forget-password', formData); // or POST if backend requires
  return res.data;
};
