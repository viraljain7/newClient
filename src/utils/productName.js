function productName(name) {
  let productName = "";
  if (name === "dmt") productName = "T360 Pay";
  else if (name === "payu-education") productName = "Add Money (Silver 1)";
  else if (name === "zwitch") productName = "Add Money (Diamond 3)";
  else if (name === "easebuzz") productName = "Add Money (Silver 2)";
  else if (name === "mtb") productName = "Add Money MTB";
  else if (name === "qrmtb") productName = "QR MTB";
  else if (name === "upipayout") productName = "UPI Payout";
  else if (name === "bbps") productName = "BBPS";
  else if (name === "payout") productName = "T360 Pay Verification";
  else if (name === "dynamic-qr") productName = "QR COLLECTION";
  else if (name === "paytm_pos") productName = "POS";
  else if (name === "cf_pg5") productName = "Add Money (Premium 2)";
  else if (name === "nixapremium2") productName = "Add Money (Premium 2)";
  else if (name === "premiumpg3") productName = "Add Money (Premium 3)";
  else if (name === "diamondpg1") productName = "Add Money (Premium 4)";
  else if (name === "diamondpg2") productName = "Add Money (Silver 2)";
  else if (name === "diamondpg3") productName = "Add Money (Diamond 2)";



  else productName = name.toUpperCase();
  return productName;
}

export { productName };
