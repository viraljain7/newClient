import api from '../../../shared/BaseApi';

export const fetchSettlements = async () => {
  const res = await api.get(`/member/retailers/eligible-settlement`);

  return res.data;
};

export const fetchStates = async () => {
  const formData = new FormData();
  formData.append('type', 'states');
  const res = await api.post(`/member/transaction`, formData);
  return res.data;
};





export const createSettlementTransfer = async (data) => {
  const formData = new FormData();  
  formData.append('type', 'settlementtransfer');
  formData.append('user_id', data.user_id);
  formData.append('amount', data.amount);
  formData.append('txnid', data.txnid);
  formData.append('remark', data.remark);

  const res = await api.post(`/fund/transaction`, formData);
  return res.data;
}


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