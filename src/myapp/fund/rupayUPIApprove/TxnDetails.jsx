
import { productName } from "../../../utils/productName";

/**
 * Renders a human-readable summary of a transaction based on its `product` type.
 *
 * Lives in its own file so new product types can be added here
 * without touching columns.jsx or the page.
 *
 * @param {{ data: object }} props
 */
const TxnDetails = ({ data }) => {
  const {
    product, mobile, provider,
    optional1, optional2, optional3, optional4, optional5,
  } = data;

  // UPI Payout
  if (product === "upipayout")
    return <>{`Name: ${optional1 || "NA"}`}<br />{`VPA: ${optional3 || "NA"}`}</>;

  // Money Transfer variants
  if (["mtb", "qrmtb", "dmt"].includes(product))
    return (
      <>
        Name: {optional2 || "NA"}<br />
        Bank: {optional3 || "NA"}<br />
        A/C No: {optional4 || "NA"}<br />
        IFSC: {optional5 || "NA"}
      </>
    );

  // Payment Gateway variants
  if ([
    "payu-education", "zwitch", "payucruise", "easebuzz",
    "cf_pg5", "nixapremium2", "premiumpg3",
    "diamondpg1", "diamondpg2", "diamondpg3",
  ].includes(product))
    return (
      <>
        Name: {optional1 || "NA"}<br />
        Mob: {mobile || "NA"} | Mode: {optional3 || "NA"}<br />
        CC No: {optional4 || "NA"}
      </>
    );

  // BBPS / Credit Card
  if (["bbps", "credit-card"].includes(product))
    return (
      <>
        Biller No: {optional2 || "NA"}<br />
        Mobile: {optional1 || "NA"}<br />
        Provider: {provider?.name || "NA"}
      </>
    );

  // Dynamic QR
  if (product === "dynamic-qr")
    return (
      <>
        {`Name: ${optional1 || "NA"}`}<br />
        {`VPA: ${optional2 || "NA"}`}<br />
        {`Mode: ${optional3 || "NA"}`}
      </>
    );

  // Mobile Recharge
  if (product === "recharge")
    return (
      <>
        {`Mobile: ${optional1 || "NA"}`}<br />
        {`Provider: ${provider?.name || "NA"}`}
      </>
    );

  // Fund Request
  if (product === "fundrequest")
    return (
      <>
        {`Name: ${optional4 || "NA"}`}<br />
        {`Mobile: ${mobile || "NA"}`}<br />
        {`Card 4 Digit: ${optional5 || "NA"}`}
      </>
    );

  // Paytm POS
  if (product === "paytm_pos")
    return <>{`Card: ${optional4 || "NA"}`}<br />{`Mode: ${optional3 || "NA"}`}</>;

  // TDS
  if (product === "tds")
    return <>TDS Deduction @ 2%</>;

  // Simple fund operations — just show the product name
  if (["payout", "fundreturn", "fundtransfer", "fundloadwallet"].includes(product))
    return <>{productName(product)}</>;

  return <>—</>;
};

export default TxnDetails;