import { Box, Typography } from "@mui/material";
import TxnDetails from "./TxnDetails";

export const TRANSACTION_COLUMNS = [
  // ── ID / Date ─────────────────────────────
  {
    field: "created_at",
    headerName: "ID / Date",
    sortable: true,

    renderCell: (row) => {
      const [date, time] = (row.created_at || "").split(" ");

      return (
        <Box sx={{ minWidth: 120 }}>
          <Typography variant="body2" fontWeight={500} >
            {row.rt_id}
          </Typography>
          <Typography variant="body2" fontWeight={500}>{date}</Typography>
          <Typography variant="body2" fontWeight={500}>{time}</Typography>
        </Box>
      );
    },

    // 🔥 export
    exportValue: (row) => row.created_at,
  },
   {
    field: "txn_details",
    headerName: "Txn Details",

    renderCell: (row) => (
      <Box sx={{ minWidth: 150 ,  fontWeight:600 }}>
        <TxnDetails data={row} />
      </Box>
    ),

    exportValue: (row) =>
      `Amount: ${row.amount} | Charge: ₹${row.charge} | ${row.service}`,
  },

  // ── Retailer ─────────────────────────────
  {
    field: "retailer",
    headerName: "Retailer",
    searchable: true,

    renderCell: (row) => (
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" fontWeight={700}>
          {row.rt_name} ({row.rt_id})
        </Typography>
        <Typography variant="body2" fontWeight={500}>{row.rt_mobile}</Typography>
      </Box>
    ),

    exportValue: (row) =>
      `${row.rt_name} (${row.rt_id}) ${row.rt_mobile}`,
  },

  

  // ── Distributor ─────────────────────────────
  {
    field: "dt",
    headerName: "Distributor",

    renderCell: (row) => (
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" fontWeight={700}>{row.dt_name }</Typography>
        <Typography variant="body2" fontWeight={500}>{row.dt_mobile }</Typography>
        <Typography variant="body2" fontWeight={500}>
          ₹ {row.dt_commission || 0}
        </Typography>
      </Box>
    ),

    exportValue: (row) =>
      row.dt_name
        ? `${row.dt_name} (${row.dt_mobile}) ₹${row.dt_commission}`
        : "₹0",
  },

  // ── Master Distributor ─────────────────────────────
  {
    field: "md",
    headerName: "Mast Distributor",

    renderCell: (row) => (
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" fontWeight={700}>{row.md_name }</Typography>
        <Typography variant="body2" fontWeight={500}>{row.md_mobile }</Typography>
        <Typography variant="body2" fontWeight={500}>
          ₹ {row.md_commission || 0}
        </Typography>
      </Box>
    ),

    exportValue: (row) =>
      row.md_name
        ? `${row.md_name} (${row.md_mobile}) ₹${row.md_commission}`
        : "₹0",
  },

  // ── CNF ─────────────────────────────
  {
    field: "cnf",
    headerName: "CNF",

    renderCell: (row) => (
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" fontWeight={700}>{row.cnf_name }</Typography>
        <Typography variant="body2" fontWeight={500}>{row.cnf_mobile }</Typography>
        <Typography variant="body2" fontWeight={500}>
          ₹ {row.cnf_commission || 0}
        </Typography>
      </Box>
    ),

    exportValue: (row) =>
      row.cnf_name
        ? `${row.cnf_name} (${row.cnf_mobile}) ₹${row.cnf_commission}`
        : "₹0",
  },

  // ── SH ─────────────────────────────
  {
    field: "sh",
    headerName: "SH",

    renderCell: (row) => (
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" fontWeight={700}>{row.sh_name }</Typography>
        <Typography variant="body2" fontWeight={500}>{row.sh_mobile }</Typography>
        <Typography variant="body2" fontWeight={500}>
          ₹ {row.sh_commission || 0}
        </Typography>
      </Box>
    ),

    exportValue: (row) =>
      row.sh_name
        ? `${row.sh_name} (${row.sh_mobile}) ₹${row.sh_commission}`
        : "₹0",
  },

  // ── NSM ─────────────────────────────
  {
    field: "nsm",
    headerName: "NSM",

    renderCell: (row) => (
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" fontWeight={700}>{row.nsm_name }</Typography>
        <Typography variant="body2" fontWeight={500}>{row.nsm_mobile }</Typography>
        <Typography variant="body2" fontWeight={500}>
          ₹ {row.nsm_commission || 0}
        </Typography>
      </Box>
    ),

    exportValue: (row) =>
      row.nsm_name
        ? `${row.nsm_name} (${row.nsm_mobile}) ₹${row.nsm_commission}`
        : "₹0",
  },

  // ── SAD ─────────────────────────────
  {
    field: "sad",
    headerName: "SAD",

    renderCell: (row) => (
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="body2" fontWeight={700}>{row.sad_name }</Typography>
        <Typography variant="body2" fontWeight={500}>{row.sad_mobile }</Typography>
        <Typography variant="body2" fontWeight={500}>
          ₹ {row.sad_commission || 0}
        </Typography>
      </Box>
    ),

    exportValue: (row) =>
      row.sad_name
        ? `${row.sad_name} (${row.sad_mobile}) ₹${row.sad_commission}`
        : "₹0",
  },

  
];