import api from "../../../shared/BaseApi";

export const fetchAllUsers = async () => {
  const formData = new FormData();
  formData.append('type', 'allusers');
  const res = await api.post(`/fund/transaction`, formData);
  return res.data;
};

export const fetchTRreport = async () => {
  const formData = new FormData();
  formData.append('type', 'fundtrreport');
  const res = await api.post(`/fund/transaction`, formData);
  return res.data;
};

export const sendTransferReturn = async (form) => {
  const formData = new FormData();

  formData.append('type', 'fundinitiate');
  formData.append('amount', form.amount);
  formData.append('remark', form.remark);
  formData.append('fundtype', form.type); // transfer / return
  formData.append('user_id', form.user_id);
  formData.append('txnid', form.txn_id);

  const res = await api.post('/fund/transaction', formData);

  return res.data;
};