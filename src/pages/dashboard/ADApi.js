import api from '../../shared/BaseApi';

export const ADBalanceApi = async () => {
  const res = await api.post('/admin-downline');

  return res.data;
};

export const ADServiceWiseBusiness = async (payload) => {
  const formData = new FormData();
  formData.append('from', payload.from);
  formData.append('to', payload.to);

  const res = await api.post('/statistics', formData);

  return res.data;
};
