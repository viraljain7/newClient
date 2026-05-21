function productName(name) {
  let productName = "";
  if (name === "dmt") productName = "Payout";
  else if (name === "payu-education") productName = " Silver 1";
  else if (name === "zwitch") productName = " Diamond 3";
  else if (name === "easebuzz") productName = " Silver 2";
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



  else productName = name.toUpperCase();
  return productName;
}

export { productName };
