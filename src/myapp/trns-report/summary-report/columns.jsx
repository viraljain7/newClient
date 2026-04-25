import { Box, Typography } from "@mui/material";
import { productName } from "../../../utils/productName";

const format = (val) =>
  `₹ ${Number(val || 0).toLocaleString("en-IN")}`;

export const TRANSACTION_COLUMNS = [
 
  // 🔹 Product
  {
    field: "product",
    headerName: "Product",
    renderCell: (row) => (
      <Typography fontWeight={600}>
        {productName(row.product)}
      </Typography>
    )
  },

  // 🔹 Total Business
  {
    field: "total_business",
    headerName: "Total Business",
    renderCell: (row) => (
      <Typography fontWeight={600}>
        {format(row.total_business)}
      </Typography>
    )
  },
    // 🔹 Success
  {
    field: "success",
    headerName: "Success",
    renderCell: (row) => (
      <Box>
        <Typography fontWeight={600} color="success.main">
          Amount: {format(row.success_amount)}
        </Typography>
        <Typography fontWeight={600}>
          Charge: {format(row.success_charge)}
        </Typography>
        <Typography fontWeight={600} >
          Count: {row.success_count}
        </Typography>
      </Box>
    )
  },
  // 🔹 Failed
  {
    field: "failed",
    headerName: "Failed",
    renderCell: (row) => (
      <Box>
        <Typography fontWeight={600} color="error.main">
          Amount: {format(row.failed_amount)}
        </Typography>
        <Typography fontWeight={600}>
          Charge: {format(row.failed_charge)}
        </Typography>
        <Typography fontWeight={600} >
          Count: {row.failed_count}
        </Typography>
      </Box>
    )
  },

  // 🔹 Pending
  {
    field: "pending",
    headerName: "Pending",
    renderCell: (row) => (
      <Box >
        <Typography fontWeight={600} color="warning.main">
          Amount: {format(row.pending_amount)}
        </Typography>
        <Typography fontWeight={600}>
          Charge: {format(row.pending_charge)}
        </Typography>
        <Typography fontWeight={600} >
          Count: {row.pending_count}
        </Typography>
      </Box>
    )
  },



];