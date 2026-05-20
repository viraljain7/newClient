import api from "../../shared/BaseApi";

export const DownlineMember = async () => {
  const res = await api.post('/dowline-member');

  return res.data;
};
