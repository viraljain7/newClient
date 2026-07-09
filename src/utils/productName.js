function productName(name) {
  let productName = "";
  if (name === "dmt") productName = "Payout";
  else if (name === "payu-education") productName = " Silver 1";
  else if (name === "zwitch") productName = " Diamond 3";
  else if (name === "easebuzz") productName = " Silver 3";
  else if (name === "mtb") productName = "Add Money MTB";
  else if (name === "qrmtb") productName = "QR MTB";
  else if (name === "upipayout") productName = "UPI Payout";
  else if (name === "bbps") productName = "BBPS";
  else if (name === "payout") productName = "T360 Pay Verification";
  else if (name === "dynamic-qr") productName = "QR COLLECTION";
  else if (name === "paytm_pos") productName = "POS";
  else if (name === "premiumpg3") productName = " Premium 2";
  else if (name === "diamondpg1") productName = " Premium 4";
  else if (name === "diamondpg2") productName = " Silver 2";
  else if (name === "diamondpg3") productName = " Diamond 2";
  else if (name === "platinumpg1") productName = " Platinum 2";
  else if (name === "cf_pg6") productName = "Diamond 4";
    else if (name === 'cf_pg7') productName = 'Premium 5';




  else productName = name.toUpperCase();
  return productName;
}


  function productNameDashboard(name) {
    let productName = '';
    if (name === 'dmt') productName = 'Payout';
    else if (name === 'payu-education') productName = 'silver 1';
    else if (name === 'zwitch') productName = 'Diamond 3';
    else if (name === 'easebuzz') productName = 'Silver 3';
    else if (name === 'mtb') productName = 'Add Money MTB';
    else if (name === 'qrmtb') productName = 'QR MTB';
    else if (name === 'upipayout') productName = 'UPI Payout';
    else if (name === 'bbps') productName = 'BBPS';
    else if (name === 'payout') productName = 'Bank Pay Verification';
    else if (name === 'dynamic-qr') productName = 'QR COLLECTION';
    else if (name === 'paytm_pos') productName = 'POS';
    else if (name === 'premiumpg3') productName = 'Premium 2';
    else if (name === 'diamondpg2') productName = 'Silver 2';
    else if (name === 'diamondpg3') productName = 'Diamond 2';
    else if (name === 'cf_pg6') productName = 'Diamond 4';
    else if (name === 'cf_pg7') productName = 'Premium 5';


    // else if (name === 'cf_pg5') productName = 'Add Money (Premium 2)';
    // else if (name === 'nixapremium2') productName = 'Add Money (Premium 2)';    else if (name === 'diamondpg1') productName = 'Premium 4';
    else productName = name.toUpperCase();
    return productName;
  }

export { productName,productNameDashboard };
