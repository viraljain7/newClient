import api from "../../../shared/BaseApi";

export const posRequest = async (form) => {
  const formData = new FormData();
  formData.append('amount', form.amount);
  formData.append('rrn', form.rrn);
  formData.append('name', form.name);
  formData.append('card_last4', form.card_last4);
  formData.append('pos_slip', form.pos_slip);
  const res = await api.post(`/service/pos/load-request`, formData);

  return res.data;
};
