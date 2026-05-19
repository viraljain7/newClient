import api from "../../shared/BaseApi";

export const RTBussinessStats = async () => {
  const res = await api.post('/dowline-filtered-business');

  return res.data;
};
