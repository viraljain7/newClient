import api from '../../../shared/BaseApi';

export const fetchServiceList = async () => {
  const formData = new FormData();
  formData.append('type', 'list');
  const res = await api.post(`/master/portal`, formData);

  return res.data;
};

export const updateService = async (form) => {
  const formData = new FormData();
  formData.append('type', 'update');
  formData.append('provider_id', form.provider_id);
  formData.append('value', form.value);
  const res = await api.post(`/master/portal`, formData);
  return res.data;
};
