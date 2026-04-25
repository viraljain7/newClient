import { Box, Typography, Chip } from "@mui/material";
import ViewLogs from "./ViewLogs";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN");

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export const TRANSACTION_COLUMNS = [

  // ── ID + DATE ─────────────────────────────
  {
    field: "id",
    headerName: "Txn Info",
    sortable: true,
    renderCell: (row) => {
      return (
        <Box>
          <Typography fontWeight={500} variant="body2">
            {row.id}
          </Typography>

          <Typography  fontWeight={500} variant="body2">
            {formatDate(row.created_at)}
          </Typography>

          <Typography  fontWeight={500} variant="body2">
            {formatTime(row.created_at)}
          </Typography>
        </Box>
      );
    }
  },



  // ── URL ────────────────────────────
  {
    field: "url",
    headerName: "API URL",
    searchable: true,
    renderCell: (row) => (
      <Box sx={{ maxWidth: 350 }}>
        <Typography
          variant="body2"
          sx={{
            wordBreak: "break-all",
          }} fontWeight={600}
        >
          {row.url}
        </Typography>
      </Box>
    )
  },

  // ── METHOD ─────────────────────────
  {
    field: "method",
    headerName: "Actions",
    renderCell: (row) => (
      <ViewLogs data={row} />
    )
  },


];