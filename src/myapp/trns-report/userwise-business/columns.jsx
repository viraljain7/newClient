import { Typography } from '@mui/material';

const format = (val) => `₹ ${Number(val || 0).toLocaleString('en-IN')}`;

export const generateColumns = (summary = {}) => {
  const FIXED_COLUMNS = [
    'row_label',
    'grand_total',
    'totals_payin',
    'totals_payout',
    'paytm_pos',
    'rupayupi',
    'dmt',
    'bbpsonline',
    'credit_card'
  ];

  const orderedKeys = [
    ...FIXED_COLUMNS.filter((key) => key in summary),
    ...Object.keys(summary).filter((key) => key !== 'id' && !FIXED_COLUMNS.includes(key))
  ];

  return orderedKeys.map((key) => ({
    field: key,
    headerName: key.replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),

    renderCell: (row) => {
      if (key === 'row_label') {
        return <Typography fontWeight={600}>{row[key]}</Typography>;
      }

      if (key === 'grand_total') {
        return <Typography fontWeight={700}>{format(row[key])}</Typography>;
      }

      return format(row[key]);
    }
  }));
};
