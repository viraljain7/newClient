import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";


import SmartTable from "../../../components/SmartTable";
import { getDefaultDateRange }   from  "../../../shared/Helper";
import { ROWS_PER_PAGE_OPTIONS } from "../../../shared/Constants";
import { useTransactions } from "./api/useTransactions";
import { TRANSACTION_COLUMNS } from "./columns";
import { handleExportAllTxnReport } from "./api/TransactionApi";

const SummaryReport = () => {
  const { fromDate: defaultFrom, toDate: defaultTo } = getDefaultDateRange(0);
 
  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate,   setToDate]   = useState(defaultTo);
 
  const {
    rows, loading, error,
    refetch, pagination,
    setPage, setPerPage,
    setSearch,    // called when user submits search (Enter / clear)
    setFilters,   // called when user clicks "Apply" in filter drawer
    filters,
    search
  } = useTransactions({
    fromDate,
    toDate,
    initialPerPage: ROWS_PER_PAGE_OPTIONS[0],
  });



  const handleExport = () => {
  handleExportAllTxnReport({
    fromDate,
    toDate,
    page: pagination.currentPage || 1,
    perPage: pagination.perPage || 25,

    // if you store these, pass them
    search,    
    filters  
  });
};


 
  return (
    <Box>
 
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>Summary Report</Typography>
          <Typography variant="body2" color="text.secondary">
            {pagination.total?.toLocaleString() ?? 0} total records
          </Typography>
        </Box>
 
        {/* ── Date Range Controls ──────────────────────────────────── */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            type="date" label="From" size="small" value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date" label="To" size="small" value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={refetch}>
            Fetch
          </Button>
        </Stack>
      </Stack>
 
      
      <SmartTable
        rows={rows}
        columns={TRANSACTION_COLUMNS}
        loading={loading}
        error={error}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onRefresh={refetch}
        serverPagination={pagination}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
        onServerSearch={setSearch}
        onServerFilterApply={setFilters}
        onExport={handleExport}
      />
    </Box>
  );
};
 
export default SummaryReport;
 