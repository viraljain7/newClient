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