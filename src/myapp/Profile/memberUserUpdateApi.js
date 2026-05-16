import api from '../../shared/BaseApi';

export const fetchUserDetails = async (payload) => {
  const formData = new FormData();

  formData.append('type', 'fetchuser');
  formData.append('user_id', payload.user_id);

  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const updateProfile = async (payload) => {
  const formData = new FormData();

  formData.append('type', 'updateprofile');

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value);
    }
  });

  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const fetchUserScheme = async (payload) => {
  const formData = new FormData();

  formData.append('type', 'list');

  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const updateUserScheme = async (payload) => {
  const formData = new FormData();

  formData.append('type', 'scheme');
  formData.append('user_id', payload.user_id);
  formData.append('scheme_id', payload.scheme_id);

  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const updateUserPassword = async (payload) => {
  const formData = new FormData();

  formData.append('type', 'password');
  formData.append('old_password', payload.old_password);
  formData.append('new_password', payload.new_password);
  formData.append('user_id', payload.user_id);

  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const updateUserKycStatus = async (payload) => {
  const formData = new FormData();

  formData.append('type', 'changekyc');
  formData.append('status', payload.status);
  formData.append('user_id', payload.user_id);

  //pending,verified,rejected,submitted
  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const updateUserWallet = async (payload) => {
  const formData = new FormData();

  formData.append('amount', payload.amount);
  formData.append('user_id', payload.user_id);

  const res = await api.post(`/wallet/${payload.type}`, formData);

  return res.data;
};

export const fetchUserParent = async (payload) => {
  const formData = new FormData();

  formData.append('user_id', payload.user_id);

  const res = await api.post(`/parent-mapping/parent-list`, formData);

  return res.data;
};

export const updateUserParent = async (payload) => {
  const formData = new FormData();

  formData.append('user_id', payload.user_id);
  formData.append('parent_id', payload.parent_id);

  const res = await api.post(`/parent-mapping/change-list`, formData);

  return res.data;
};

export const updateUserMid = async (payload) => {
  const formData = new FormData();

  formData.append('retailer_id', payload.user_id);
  formData.append('mid', payload.mid);

  const res = await api.post(`/member/set-mid`, formData);

  return res.data;
};
