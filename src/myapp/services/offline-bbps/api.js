import api from '../../../shared/BaseApi';

export const offlineBillPayment = async (mobile, cardNumber, amount, title) => {
  const formData = new FormData();

  formData.append('type', 'transaction');
  formData.append('mobile', mobile);
  formData.append('number', cardNumber);
  formData.append('amount', amount);
  formData.append('name', title);

  const res = await api.post('/service/credit-card', formData);

  return res.data;
};
