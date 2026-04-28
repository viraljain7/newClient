// import api from "../../../shared/BaseApi";

import api from '../../../shared/BaseApi';

export const payBbpsBill = async (bill, amount) => {
  const payload = {
    billmobile: bill.mobile,
    billnumber: bill.card_last_4_digit,
    billamount: Number(amount), // in rupees

    biller_id: bill.biller_id,
    enquiryrefid: bill.enquiryReferenceId,

    name: bill.customerName,
    initchannel: 'AGT',
    paymentmode: 'Cash',

    additionalInfo: bill.additionalInfo,
    billerResponse: bill.billerResponse,
    billFetchInputParams: bill.billFetchInputParams,

    params: '10'
  };

  const res = await api.post('/service/bbpscc/bill-payment', payload);

  return res.data;
};

export const fetchBill=async(mobile,cardLast4,code)=>{
    const formData = new FormData();
    
      formData.append("mobile", mobile);
      formData.append("number", cardLast4);
      formData.append("biller_id", code);
      formData.append("amount", '100');
      formData.append("initchannel", 'AGT');
    
      const res = await api.post(
        "/service/bbpscc/fetch-bill",
        formData
      );

      return res.data;
}
