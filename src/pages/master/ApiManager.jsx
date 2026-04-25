

import  { useMemo, useState } from "react";
import {
  Box, Badge, Button, Drawer, FormControl, IconButton,
  InputAdornment, InputLabel, MenuItem, Paper, Select,
  Skeleton, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography,
   Chip, Stack,  Alert, 
} from "@mui/material";
import SearchIcon        from "@mui/icons-material/Search";
import FilterListIcon    from "@mui/icons-material/FilterList";
import CloseIcon         from "@mui/icons-material/Close";
import ArrowUpwardIcon   from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { getNestedValue, getDefaultDateRange} from "./demo/Helper";


// ─── Helpers ──────────────────────────────────────────────

 
function SkeletonRows({ columns, count = 5 }) {
  return Array.from({ length: count }).map((_, i) => (
    <TableRow key={i}>
      {columns.map((col) => (
        <TableCell key={col.field}>
          <Skeleton variant="text" width="80%" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
// ─── Main Component ───────────────────────────────────────
const SmartTable = ({
  rows = [],
  columns = [],
  loading = false,
  error = null,
  rowsPerPageOptions = ROWS_PER_PAGE_OPTIONS,
  onRefresh,
 
  // ── Server-side pagination props ──────────────────────
  // If provided, the table switches to server-side mode.
  serverPagination,   // { currentPage, lastPage, perPage, total }
  onPageChange,       // (newPage) => void    — 1-based
  onPerPageChange,    // (newPerPage) => void
}) => {
  const isServerSide = Boolean(serverPagination);
 
  // ── Client-side state (only used when NOT server-side) ──
  const [clientPage, setClientPage]         = useState(0);  // MUI is 0-based
  const [clientPerPage, setClientPerPage]   = useState(rowsPerPageOptions[0]);
  const [search, setSearch]                 = useState("");
  const [filters, setFilters]               = useState({});
  const [filterOpen, setFilterOpen]         = useState(false);
  const [sortField, setSortField]           = useState(null);
  const [sortDir, setSortDir]               = useState("asc");
 
  const searchableColumns  = columns.filter((c) => c.searchable);
  const filterableColumns  = columns.filter((c) => c.filter);
  const activeFilterCount  = Object.values(filters).filter(Boolean).length;
 
  const handleSortToggle = (field) => {
    if (sortField === field) setSortDir((p) => (p === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
    if (!isServerSide) setClientPage(0);
  };
 
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    if (!isServerSide) setClientPage(0);
  };
 
  const clearFilters = () => {
    setFilters({});
    setSearch("");
    if (!isServerSide) setClientPage(0);
  };
 
  // ── Rows to display ────────────────────────────────────
  // Server-side: rows already contain only the current page
  // Client-side: filter → sort → slice
  const displayRows = useMemo(() => {
    if (isServerSide) return rows;   // server already filtered & paginated
 
    const filtered = rows.filter((row) => {
      const matchesSearch =
        !search ||
        searchableColumns.some((col) =>
          String(getNestedValue(row, col.field) ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      const matchesFilters = columns.every((col) => {
        if (!col.filter) return true;
        const fv = filters[col.field];
        if (fv == null || fv === "") return true;
        return String(getNestedValue(row, col.field) ?? "")
          .toLowerCase()
          .includes(String(fv).toLowerCase());
      });
      return matchesSearch && matchesFilters;
    });
 
    const sorted = applySorting(filtered, sortField, sortDir);
    const start  = clientPage * clientPerPage;
    return sorted.slice(start, start + clientPerPage);
  }, [rows, search, filters, sortField, sortDir, clientPage, clientPerPage, isServerSide, searchableColumns, columns]);
 
  const clientFilteredCount = useMemo(() => {
    if (isServerSide) return serverPagination.total;
    return rows.filter((row) => {
      const matchesSearch = !search || searchableColumns.some((col) =>
        String(getNestedValue(row, col.field) ?? "").toLowerCase().includes(search.toLowerCase())
      );
      const matchesFilters = columns.every((col) => {
        if (!col.filter) return true;
        const fv = filters[col.field];
        if (fv == null || fv === "") return true;
        return String(getNestedValue(row, col.field) ?? "").toLowerCase().includes(String(fv).toLowerCase());
      });
      return matchesSearch && matchesFilters;
    }).length;
  }, [rows, search, filters, isServerSide, serverPagination, searchableColumns, columns]);
 
  // ── Map API pagination → MUI props ───────────────────────
  //
  // Your API returns:
  //   pagination.current_page (1-based) → MUI needs 0-based → subtract 1
  //   pagination.last_page              → used in footer label
  //   pagination.total                  → MUI count (total records)
  //   perPage (our own state)           → MUI rowsPerPage (never trust API echo)
  //
  // MUI automatically disables Next when (page+1)*rowsPerPage >= count
 
  const sp          = serverPagination || {};
  const muiPage     = isServerSide ? Math.max(0, (sp.currentPage ?? 1) - 1) : clientPage;
  const muiPerPage  = isServerSide ? (sp.perPage  ?? rowsPerPageOptions[0]) : clientPerPage;
  const muiTotal    = isServerSide ? (sp.total    ?? 0)                     : clientFilteredCount;
  const muiLastPage = isServerSide ? (sp.lastPage ?? 1)                     : null;
 
  const handleMuiPageChange = (_, newPage) => {
    // MUI gives 0-based page → API expects 1-based
    if (isServerSide) onPageChange?.(newPage + 1);
    else setClientPage(newPage);
  };
 
  const handleMuiPerPageChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isServerSide) onPerPageChange?.(val);
    else { setClientPerPage(val); setClientPage(0); }
  };
 
  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
 
      {/* ── Toolbar ── */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap", borderBottom: "1px solid #eee" }}>
        <TextField
          size="small"
          placeholder={isServerSide ? "Search (press Enter)..." : "Search..."}
          value={search}
          onChange={(e) => { setSearch(e.target.value); if (!isServerSide) setClientPage(0); }}
          sx={{ minWidth: 280 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
            ),
            endAdornment: search ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch("")}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
 
        <Stack direction="row" spacing={1} alignItems="center">
          {onRefresh && (
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onRefresh} disabled={loading}>
              Refresh
            </Button>
          )}
          <Badge badgeContent={activeFilterCount} color="primary">
            <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setFilterOpen(true)}>
              Filters
            </Button>
          </Badge>
        </Stack>
      </Box>
 
      {/* ── Error ── */}
      {error && <Alert severity="error" sx={{ borderRadius: 0 }}>{error}</Alert>}
 
      {/* ── Table ── */}
      <TableContainer>
        <Table sx={{
          "& .MuiTableCell-root": { border: "1px solid", borderColor: "divider" },
          "& .MuiTableHead-root .MuiTableCell-root": { fontWeight: 700, backgroundColor: "grey.100" },
        }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    whiteSpace: "nowrap",
                    cursor: col.sortable ? "pointer" : "default",
                    userSelect: "none",
                    "&:hover": col.sortable ? { backgroundColor: "grey.200" } : {},
                  }}
                  onClick={() => col.sortable && handleSortToggle(col.field)}
                >
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <span>{col.headerName}</span>
                    {col.sortable && sortField === col.field && (
                      sortDir === "asc"
                        ? <ArrowUpwardIcon fontSize="inherit" />
                        : <ArrowDownwardIcon fontSize="inherit" />
                    )}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
 
          <TableBody>
            {loading ? (
              <SkeletonRows columns={columns} count={muiPerPage} />
            ) : displayRows.length > 0 ? (
              displayRows.map((row, i) => (
                <TableRow hover key={row.id || row.txnid || i}>
                  {columns.map((col) => (
                    <TableCell key={col.field} sx={{ py: 3}}>
                      {col.renderCell
                        ? col.renderCell(row)
                        : (getNestedValue(row, col.field) ?? "-")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 6, color: "text.secondary" ,font:"bold" }}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
 
      {/* ── Pagination ── */}
      {/*
        API pagination object fields used:
          current_page → muiPage (converted to 0-based)
          last_page    → shown in label + disables Next on last page
          total        → count prop (MUI calculates page count from total/rowsPerPage)
          per_page     → IGNORED — we use our own perPage state instead
      */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, flexWrap: "wrap" }}>
        {isServerSide && sp.total > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ pl: 1 }}>
            Page <strong>{sp.currentPage}</strong> of <strong>{sp.lastPage}</strong>
            {" · "}
            <strong>{sp.total?.toLocaleString()}</strong> total records
          </Typography>
        )}
        <TablePagination
          component="div"
          count={muiTotal}
          page={muiPage}
          rowsPerPage={muiPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={handleMuiPageChange}
          onRowsPerPageChange={handleMuiPerPageChange}
          // Prevent going past last_page (extra guard alongside MUI's own count check)
          nextIconButtonProps={{
            disabled: loading || (isServerSide && muiPage + 1 >= muiLastPage),
          }}
          backIconButtonProps={{
            disabled: loading || muiPage === 0,
          }}
          sx={{ ml: "auto" }}
        />
      </Box>
 
      {/* ── Filter Drawer ── */}
      <Drawer anchor="right" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Box sx={{ width: 360, p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={700}>
              Filters {activeFilterCount > 0 && `(${activeFilterCount} active)`}
            </Typography>
            <IconButton onClick={() => setFilterOpen(false)}><CloseIcon /></IconButton>
          </Stack>
 
          {filterableColumns.map((col) => (
            <Box key={col.field}>
              {col.filter.type === "select" ? (
                <FormControl fullWidth>
                  <InputLabel>{col.headerName}</InputLabel>
                  <Select
                    value={filters[col.field] || ""}
                    label={col.headerName}
                    onChange={(e) => handleFilterChange(col.field, e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {col.filter.options.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={col.headerName}
                  value={filters[col.field] || ""}
                  onChange={(e) => handleFilterChange(col.field, e.target.value)}
                />
              )}
            </Box>
          ))}
 
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button fullWidth variant="outlined" onClick={clearFilters}>Clear All</Button>
            <Button fullWidth variant="contained" onClick={() => setFilterOpen(false)}>Apply</Button>
          </Stack>
        </Box>
      </Drawer>
    </Paper>
  );
};
 





















 
import RefreshIcon from "@mui/icons-material/Refresh";
import {  ROWS_PER_PAGE_OPTIONS } from "./demo/Constants";
import { useTransactions } from "./demo/useTransactions";
import { productName } from "../../utils/productName";


 
// ─── Column Definitions ───────────────────────────────────
// Columns are defined HERE, close to the page that knows the data shape.
// Each column is a plain object — easy to add, remove, or reorder.
const COLUMNS = [
  {
    field: "created_at",
    headerName: "Date",
    filter: { type: "text" },
    renderCell: (row) => (
      <Box sx={{ minWidth: 60 }}>
          <Typography variant="body2" fontWeight={700}>
          {row.id}
        </Typography>
        <Typography variant="body2" fontWeight={700}>
          {row.created_at?.split(" ")[0]}
        </Typography>
        <Typography variant="caption" >
          {row.created_at?.split(" ")[1]}
        </Typography>
      </Box>
    ),
  },

  {
    field: "user",
    headerName: "User Details",
    filter: { type: "text" },
    renderCell: (row) => (
      <Box sx={{ minWidth: 180 }}>
        <Typography variant="body2" fontWeight={700}>
          {row.user?.name} ({row.user_id})
        </Typography>

        <Typography variant="body2" fontWeight={700} >
          {row.mobile}
        </Typography>

        <Typography variant="caption" color="primary.main">
          {row.user?.role?.name || "Retailer"}
        </Typography>
      </Box>
    ),
  },

{
  field: "transaction",
  headerName: "Transaction Details",
  renderCell: (row) => (
    <Box sx={{ minWidth: 180 }}>
      <Typography variant="body2" lineHeight={1.8} fontWeight={700}>
        <TxnDetails data={row} />
      </Typography>
    </Box>
  ),
},


  {
    field: "reference",
    headerName: "Reference Details",
    filter: { type: "text" },
    renderCell: (row) => (
      <Box sx={{ minWidth: 250 }}>
        <Typography variant="body2" fontWeight={700}>
          TXN ID: {row.txnid}
        </Typography>


        <Typography variant="body2" fontWeight={700}>
          UTR: {row.utr || "NA"}
        </Typography>

        <Typography variant="body2" fontWeight={700} >
          Product: {productName(row.product)}
        </Typography>
      </Box>
    ),
  },

  {
    field: "amount",
    headerName: "Amount",
    renderCell: (row) => (
      <Box sx={{ minWidth: 150 }}>
        <Typography variant="body2" fontWeight={700}>
        Amount:  {Number(row.amount).toLocaleString("en-IN")}
        </Typography>

        <Typography variant="body2" fontWeight={700}>
          Charge: {Number(row.charge).toLocaleString("en-IN")}
        </Typography>

        <Typography variant="body2" fontWeight={700}>
          Opening: {Number(row.opening_balance).toLocaleString("en-IN")}
        </Typography>

        <Typography variant="body2" fontWeight={700}>
          Closing: {Number(row.closing_balance).toLocaleString("en-IN")}
        </Typography>
      </Box>
    ),
  },



  {
    field: "status",
    headerName: "Action",
    filter: {
      type: "select",
      options: ["success", "pending", "failed", "refunded"],
    },
    renderCell: (row) => {
      const status = row.status?.toLowerCase();

      return (
        <Chip
          label={status}
          size="small"
          variant="outlined"
          color={
            status === "success"
              ? "success"
              : status === "pending"
              ? "warning"
              : status === "failed"
              ? "error"
              : "info"
          }
          sx={{
            minWidth: 10,
            fontWeight: 700,
            textTransform: "capitalize",
            borderRadius: 2,
            borderWidth: 2,
          }}
        />
      );
    },
  },
];
 
// ─── Component ────────────────────────────────────────────
const TransactionReport = () => {
  // Date range lives here because it's a UI concern (user picks it)
  const { fromDate: defaultFrom, toDate: defaultTo } = getDefaultDateRange(0);
  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate]     = useState(defaultTo);
  const [clientPerPage, setClientPerPage]   = useState(ROWS_PER_PAGE_OPTIONS[0]);

 
  // All data-fetching logic lives in the hook — we just consume the result
  const { rows, loading, error, refetch ,pagination,setPage,setPerPage} = useTransactions({ fromDate, toDate,initialPerPage: clientPerPage});
 
  return (
    <Box >
 
      {/* ── Page Header ── */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Transaction Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {rows.length} records loaded
          </Typography>
        </Box>
 
        {/* ── Date Range Controls ── */}
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
 
      {/* ── Table ── */}
      {/*
        SmartTable is a "dumb" component — it only knows how to DISPLAY data.
        All data decisions are made above and passed as props.
      */}
      <SmartTable
        rows={rows}
        columns={COLUMNS}
        loading={loading}
        error={error}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onRefresh={refetch}
        serverPagination={pagination}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
        
      />
    </Box>
  );
};

export default TransactionReport;



const TxnDetails = ({ data }) => {
  const { product, optional1, optional2, optional3, optional4, optional5, mobile, provider } = data;

  if (product === "upipayout")
    return <>{`Name: ${optional1 || "NA"}`}<br />{`VPA: ${optional3 || "NA"}`}</>;

  if (["mtb", "qrmtb", "dmt"].includes(product))
    return <>Name: {optional2 || "NA"}<br />Bank: {optional3 || "NA"}<br />A/C No: {optional4 || "NA"}<br />IFSC: {optional5 || "NA"}</>;

  if (["payu-education", "zwitch", "payucruise", "easebuzz", "cf_pg5", "nixapremium2", "premiumpg3", "diamondpg1", "diamondpg2", "diamondpg3"].includes(product))
    return <>Name: {optional1 || "NA"}<br />Mob: {mobile || "NA"} | Mode: {optional3 || "NA"}<br />CC No: {optional4 || "NA"}</>;

  if (["bbps", "credit-card"].includes(product))
    return <>Biller No: {optional2 || "NA"}<br />Mobile: {optional1 || "NA"}<br />Provider: {provider?.name || "NA"}</>;

  if (product === "dynamic-qr")
    return <>{`Name: ${optional1 || "NA"}`}<br />{`VPA: ${optional2 || "NA"}`}<br />{`Mode: ${optional3 || "NA"}`}</>;

  if (product === "recharge")
    return <>{`Mobile: ${optional1 || "NA"}`}<br />{`Provider: ${provider?.name || "NA"}`}</>;

  if (product === "fundrequest")
    return <>{`Name: ${optional4 || "NA"}`}<br />{`Mobile: ${mobile || "NA"}`}<br />{`Card 4 Digit: ${optional5 || "NA"}`}</>;

  if (product === "paytm_pos")
    return <>{`Card: ${optional4 || "NA"}`}<br />{`Mode: ${optional3 || "NA"}`}</>;

  if (product === "tds")
    return <>TDS Deduction @ 2%</>;

  if (["payout", "fundreturn", "fundtransfer", "fundloadwallet"].includes(product))
    return <>{productName(product)}</>;

  return <>—</>;
};