import { Typography } from "@mui/material";
const format = (val) =>
  `₹ ${Number(val || 0).toLocaleString("en-IN")}`;
export const TRANSACTION_COLUMNS  = [
  {
    field: "row_label",
    headerName: "User",
    renderCell: (row) => (
      <Typography fontWeight={600}>{row.row_label}</Typography>
    )
  },

  {
    field: "pg_1_pg_4",
    headerName: "Diamond 1 & 2 (₹)",
    renderCell: (row) => format(row.pg_1_pg_4)
  },

  {
    field: "pg_2",
    headerName: "Silver 1 (₹)",
    renderCell: (row) => format(row.pg_2)
  },

  {
    field: "pg_3",
    headerName: "Silver 2 (₹)",
    renderCell: (row) => format(row.pg_3)
  },

  {
    field: "credit_card",
    headerName: "Credit Card (₹)",
    renderCell: (row) => format(row.credit_card)
  },

  {
    field: "recharge",
    headerName: "Recharge (₹)",
    renderCell: (row) => format(row.recharge)
  },

  {
    field: "payout",
    headerName: "T360 Pay (₹)",
    renderCell: (row) => format(row.payout)
  },

  {
    field: "billpay",
    headerName: "BBPS (₹)",
    renderCell: (row) => format(row.billpay)
  },

  {
    field: "dmt",
    headerName: "DMT (₹)",
    renderCell: (row) => format(row.dmt)
  },

  {
    field: "grand_total",
    headerName: "Total (₹)",
    renderCell: (row) => (
      <Typography fontWeight={700}>
        {format(row.grand_total)}
      </Typography>
    )
  }
];
