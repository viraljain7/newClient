import api from '../../../../shared/BaseApi';

export const uploadSlip = async (form) => {
  const formData = new FormData();

  formData.append('utr', form.txnId);
  formData.append('amount', form.amount);
  formData.append('name', form.name);
  formData.append('mobile', form.mobile);
  formData.append('screenshot', form.slip);
  // DEBUG
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  const res = await api.post('/service/rupayupi/load-request', formData);

  return res.data;
};

export const approveRejectSlip = async (form) => {
  const formData = new FormData();

  formData.append('id', form.id);
  if (form.reason) {
    formData.append('reason', form.reason);
  }
  const res = await api.post(`/admin/rupayupi/${form.type}`, formData);

  return res.data;
};
