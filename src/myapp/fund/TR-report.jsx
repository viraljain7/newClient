import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

// import SmartTable from "../../../components/SmartTable";
import { getDefaultDateRange } from "../../shared/Helper";
import { ROWS_PER_PAGE_OPTIONS } from "../../shared/Constants";

import SmartTable from "../../components/SmartTable";
import useFund from "./helper/useFundTR";


import { TRANSACTION_COLUMNS } from "./columns";

const TRreport = () => {
  const { fromDate: defaultFrom, toDate: defaultTo } = getDefaultDateRange(0);

  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState(defaultTo);

  const {
    trReport: rows = [],
    loading = false,
    error = null,
    refetch
  } = useFund();

  console.log(refetch)

  const handleExport = () => {
    // implement later if needed
  };

  return (
    <Box>
      {/* ── Header ───────────────────────────────── */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Transfer Report
          </Typography>

          {/* ✅ FIX: use rows length instead of pagination */}
          <Typography variant="body2" color="text.secondary">
            {rows.length} total records
          </Typography>
        </Box>

        {/* ── Date Filters ───────────────────────── */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            type="date"
            label="From"
            size="small"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="date"
            label="To"
            size="small"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={refetch}
          >
            Fetch
          </Button>
        </Stack>
      </Stack>

      {/* ── Table ───────────────────────────────── */}
      <SmartTable
        rows={rows}
        columns={TRANSACTION_COLUMNS}
        loading={loading}
        error={error}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onRefresh={refetch}
        onExport={handleExport}
      />
    </Box>
  );
};

export default TRreport;