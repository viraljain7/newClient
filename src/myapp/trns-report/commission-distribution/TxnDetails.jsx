import { Chip, Typography } from '@mui/material';
import { colorMap } from '../../../shared/Constants';
import { productName } from '../../../utils/productName';

/**
 * Renders a human-readable summary of a transaction based on its `product` type.
 *
 * Lives in its own file so new product types can be added here
 * without touching columns.jsx or the page.
 *
 * @param {{ data: object }} props
 */
const TxnDetails = ({ data }) => {
  // Recharge

  const { amount, charge, service } = data;
  if (data) {
    return (
      <>
        <Typography variant="body2" fontWeight={700}>
          Amount: {amount} <br />
        </Typography>
        <Typography variant="body2" fontWeight={700}>
          Charge: {charge}
          <br />
          {productName(service)}

        </Typography>

      </>
    );
  }

  return <>—</>;
};

export default TxnDetails;
