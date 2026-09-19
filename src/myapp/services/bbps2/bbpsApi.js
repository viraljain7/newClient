// import api from "../../../shared/BaseApi";

import api from '../../../shared/BaseApi';

export const payBbpsBill = async (bill, amount, panCard) => {
  const payload = {
    card: bill.card,
    amount: Number(amount), // in rupees
    pan: panCard,
    fetch_id: bill.fetch_id,
    opcode: bill.opcode,
    mobile:bill.mobile
  };

  const res = await api.post('/service/inspaycc/bill-payment', payload);

  return res.data;
};

export const fetchBill = async (mobile, cardLast4, code) => {
  const formData = new FormData();

  formData.append('mobile', mobile);
  formData.append('card', cardLast4);
  formData.append('opcode', code);

  const res = await api.post('/service/inspaycc/fetch-bill', formData);

  return res.data;
};
