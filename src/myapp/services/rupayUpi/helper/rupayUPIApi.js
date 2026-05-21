import api from '../../../../shared/BaseApi';

export const uploadSlip = async (form) => {
  const formData = new FormData();

  formData.append('utr', form.txnId);
  formData.append('amount', form.amount);
  formData.append('name', form.name);
  formData.append('mobile', form.mobile);
  formData.append('screenshot', form.slip);
  // DEBUG
  

  const res = await api.post('/service/rupayupi/load-request', formData);

  return res.data;
};

// Get current QR image URL
export const getQr = async () => {
  const res = await api.get('/qr-image');
  return res.data;
  // returns: { status: true, image_url: "https://..." }
};