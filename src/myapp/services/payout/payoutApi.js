import api from '../../../shared/BaseApi';

export const fetchUserPayoutDetails = async (mobile) => {
  const formData = new FormData();

  formData.append('type', 'payoutlist');
  formData.append('mobile', mobile);

  const res = await api.post('/service/dmt', formData);

  return res.data;
};

export const mobileNumberKyc = async (mobile, aadhaar_name, dob, city, aadhaar_number) => {
 

 const [yy,dd,mm]=dob.split("-")
//  console.log("mm/dd/yy")
    const formData = new FormData();

  formData.append('type', 'addpayout');
  formData.append('mobile', mobile);
  formData.append('dob', `${mm}/${dd}/${yy}`);
  formData.append('city', city);
  formData.append('name', aadhaar_name);

  if (aadhaar_number) {
    formData.append('aadhaar_number', aadhaar_number);
  }

  const res = await api.post('/service/dmt', formData);

  return res.data;
};

export const fetchBanks = async () => {
  const formData = new FormData();

  formData.append('type', 'allbanks');

  const res = await api.post('/service/dmt', formData);

  return res.data;
};

export const addBankAccount = async (bank_name, account_number, ifsc, account_name, mobile) => {
  const formData = new FormData();

  formData.append('type', 'addbank');
  formData.append('bank_name', bank_name);
  formData.append('account_number', account_number);
  formData.append('ifsc', ifsc);
  formData.append('account_name', account_name);
  formData.append('mobile', mobile);

  const res = await api.post('/service/dmt', formData);

  return res.data;
};

export const bankAccountVerify = async (payout_id, txnid) => {
  const formData = new FormData();

  formData.append('type', 'payoutverify');
  formData.append('payout_id', payout_id);
  formData.append('txnid', txnid);

  const res = await api.post('/service/dmt', formData);

  return res.data;
};

export const makePayoutTxn = async (payout_id, txnid, amount, mode) => {
  const formData = new FormData();

  formData.append('type', 'transaction');
  formData.append('payout_id', payout_id);
  formData.append('txnid', txnid);
  formData.append('mode', mode);
  formData.append('amount', amount);

  const res = await api.post('/service/dmt', formData);

  return res.data;
};
