import api from '../../../shared/BaseApi';

export const updateProfile = async (form) => {
  const formData = new FormData();

  formData.append('type', 'updateprofile');

  Object.entries(form).forEach(([key, value]) => {
    if (key !== 'type' && value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const updateDocs = async (form) => {
  const formData = new FormData();

  Object.entries({
    ...form,
    type: form?.type || 'updateprofile'
  }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  

  const res = await api.post(
    '/member/transaction',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },

      // VERY IMPORTANT
      transformRequest: [(data) => data]
    }
  );

  return res.data;
};





export const step1ContactDetails = async (form) => {
  const formData = new FormData();

  formData.append('type', 'updateprofile');
  formData.append('user_id', Number(form.user_id));
  formData.append('businesstype', form.business_type);
  formData.append('address', form.address); // transfer / return
  formData.append('city', form.city);
  formData.append('pincode', form.pincode);
  formData.append('progress', '1');

  const res = await api.post('/member/transaction', formData);

  return res.data;
};

export const step1Otp = async () => {
  const res = await api.post('/member/onboard/otp');

  return res.data;
};

export const step1VerifyOtp = async (form) => {
  const formData = new FormData();

  formData.append('otp', form.otp);

  const res = await api.post('/member/onboard/otp', formData);

  return res.data;
};

export const step2VerifyAadhaarMobile = async (form) => {
  const formData = new FormData();

  formData.append('mobile_number', form.mobile);

  const res = await api.post('/digilocker/verify-account', formData);

  return res.data;
};

export const step2InitiateDigiLocker = async () => {
  const res = await api.get('/digilocker/initiate');

  return res.data;
};

export const step3PanVerify = async (form) => {
  const res = await api.post('/member/pan/verify-details', {
    token: 'YK14DdEXfmGvBB6mc6CDdJCLRXYFje',
    pan: form.panNumber,
    orderid: `ORD${Date.now()}`
  });

  return res.data;
};


export const step4BankVerify = async (form) => {

    const formData = new FormData();

  formData.append('accountnumber', form.accNumber);
  formData.append('ifsccode', form.ifsccode);


  const res = await api.post('/member/bank/verify-details', formData);

  return res.data;
};

