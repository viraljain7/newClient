import api from '../../../shared/BaseApi';

export const fetchMember = async (type) => {
  const res = await api.get(`/member/${type}`);

  return res.data;
};

export const fetchStates = async () => {
  const formData = new FormData();
  formData.append('type', 'states');
  const res = await api.post(`/member/transaction`, formData);

  return res.data;
};

export const createAgent = async (data) => {
  const formData = new FormData();

  Object.entries({
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    shopname: data.company,
    city: data.city,
    role_id: data.role_id,
    state: data.state
  }).forEach(([key, value]) => formData.append(key, value));

  const res = await api.post(`/member/create`, formData);
  return res.data;
};