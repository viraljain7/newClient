import { useEffect, useState } from "react";
import {
  Alert, Badge, Box, Button, IconButton, InputAdornment,
  Paper, Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField, Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { ROWS_PER_PAGE_OPTIONS } from "../../shared/Constants";
import FilterDrawer from "./FilterDrawer";
import SkeletonRows from "./SkeletonRows";
import { useTableState } from "./useTableState";

const SmartTable = ({
  rows = [],
  columns = [],
  loading = false,
  error = null,
  rowsPerPageOptions = ROWS_PER_PAGE_OPTIONS,
  onRefresh,
  serverPagination,
  onPageChange,
  onPerPageChange,
  onServerSearch,
  onServerFilterApply,
  onExport,// Add
  footerRows
}) => {


  const isServerSide = Boolean(serverPagination);
  const hasServerSearch = isServerSide && Boolean(onServerSearch);
  const hasServerFilter = isServerSide && Boolean(onServerFilterApply);

  const [filterOpen, setFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [draftFilters, setDraftFilters] = useState({});

  const {
    page, setPage,
    perPage, setPerPage,
    search,
    sortField, sortDir,
    filters, activeFilterCount,
    displayRows, filteredCount,
    filterableColumns,
    handleSearch,
    handleSortToggle,
    handleFilterChange,
    clearFilters,
  } = useTableState({ rows, columns, rowsPerPageOptions, isServerSide });

  // ---------------- Pagination ----------------
  const sp = serverPagination || {};

  const muiPage = isServerSide
    ? Math.max(0, (sp.currentPage ?? 1) - 1)
    : page;

  const muiPerPage = isServerSide
    ? (sp.perPage ?? rowsPerPageOptions[0])
    : perPage;

  const muiTotal = isServerSide
    ? (sp.total ?? 0)
    : filteredCount;

  const muiLast = isServerSide ? (sp.lastPage ?? 1) : null;

  const handlePageChange = (_, newPage) => {
    if (isServerSide) onPageChange?.(newPage + 1);
    else setPage(newPage);
  };

  const handlePerPageChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isServerSide) onPerPageChange?.(val);
    else {
      setPerPage(val);
      setPage(0);
    }
  };

  // ---------------- Search ----------------
  const searchDisplayValue = hasServerSearch ? localSearch : search;

  const handleSearchInput = (value) => {
    if (hasServerSearch) {
      setLocalSearch(value);
    } else {
      handleSearch(value);
    }
  };

  const commitServerSearch = (value) => {
    if (hasServerSearch) {
      onServerSearch(value);
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
    if (hasServerSearch) onServerSearch("");
    else handleSearch("");
  };

  // ---------------- Filters ----------------
  const activeFilters = hasServerFilter ? draftFilters : filters;

  const activeFilterCount2 = hasServerFilter
    ? Object.values(draftFilters).filter(v => v !== undefined && v !== "").length
    : activeFilterCount;

  const handleDraftFilterChange = (field, value) => {
    if (hasServerFilter) {
      setDraftFilters(prev => ({ ...prev, [field]: value }));
    } else {
      handleFilterChange(field, value);
    }
  };

  const handleFilterApply = () => {
    if (hasServerFilter) {
      onServerFilterApply(draftFilters);
    }
    setFilterOpen(false);
  };

  const handleFilterClearAll = () => {
    setDraftFilters({});
    if (hasServerFilter) {
      onServerFilterApply({});
    } else {
      clearFilters();
    }
    setFilterOpen(false);
  };

  // sync filters when opening drawer
  const handleOpenFilters = () => {
    if (hasServerFilter) {
      setDraftFilters(filters);
    }
    setFilterOpen(true);
  };

  // ---------------- Refresh ----------------
  const handleRefresh = () => {
    setLocalSearch("");
    setDraftFilters({});
    onRefresh?.();
  };

const normalizedFooterRows = Array.isArray(footerRows)
  ? footerRows
  : footerRows
    ? [footerRows]
    : [];

  // ---------------- Render ----------------
  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>

      {/* Toolbar */}
      <Box sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        flexWrap: "wrap",
        borderBottom: "1px solid #eee",
      }}>
        <TextField
          size="small"
          placeholder={hasServerSearch ? "Search (press Enter)…" : "Search…"}
          value={searchDisplayValue}
          onChange={(e) => handleSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitServerSearch(localSearch);
          }}
          sx={{ minWidth: 280 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchDisplayValue ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center">

          {/* ✅ Export Button */}
  <Button
    variant="outlined"
    color="info"
    startIcon={<FileDownloadIcon />}
    onClick={onExport}   // 👈 pass from parent
    disabled={loading}
  >
    Export
  </Button>
          {onRefresh && (
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh
            </Button>
          )}

          <Badge badgeContent={activeFilterCount2} color="primary">
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleOpenFilters}
            >
              Filters
            </Button>
          </Badge>
        </Stack>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          {error}
        </Alert>
      )}

      {/* Table */}
      <TableContainer>
        <Table sx={{
          "& .MuiTableCell-root": { border: "1px solid", borderColor: "divider" },
          "& .MuiTableHead-root .MuiTableCell-root": {
            fontWeight: 700,
            backgroundColor: "grey.100",
          },
        }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  onClick={() => col.sortable && handleSortToggle(col.field)}
                  sx={{
                    whiteSpace: "nowrap",
                    cursor: col.sortable ? "pointer" : "default",
                    userSelect: "none",
                    "&:hover": col.sortable ? { backgroundColor: "grey.200" } : {},
                  }}
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
    <>
      {/* ✅ MAIN ROWS */}
      {displayRows.map((row) => (
        <TableRow hover key={row.id || row.txnid}>
          {columns.map((col) => (
            <TableCell key={col.field} sx={{ py: 1.5 }}>
              {col.renderCell
                ? col.renderCell(row)
                : (row[col.field] ?? "—")}
            </TableCell>
          ))}
        </TableRow>
      ))}
          
      {/* FOOTER */}
  {normalizedFooterRows.length > 0 &&
  normalizedFooterRows.map((row, index) => (
    <TableRow
      key={`footer-${index}`}
      sx={{
        backgroundColor: "#eef3ff",
        borderTop: "2px solid #1976d2",
      }}
    >
      {columns.map((col) => (
        <TableCell key={col.field}>
          {col.renderCell
            ? col.renderCell({ ...row, isFooter: true })
            : (row[col.field] ?? "—")}
        </TableCell>
      ))}
    </TableRow>
  ))
}
    </>
  ) : (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        align="center"
        sx={{ py: 6, color: "text.secondary" }}
      >
        No transactions found for selected filters
      </TableCell>
    </TableRow>
  )}
</TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        flexWrap: "wrap",
      }}>
        {isServerSide && sp.total > 0 && (
          <Typography variant="caption" color="text.secondary">
            Page <strong>{sp.currentPage}</strong> of <strong>{sp.lastPage}</strong>
            {" · "}
            <strong>{sp.total?.toLocaleString()}</strong> records
          </Typography>
        )}

        <TablePagination
          component="div"
          count={muiTotal}
          page={muiPage}
          rowsPerPage={muiPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handlePerPageChange}
          nextIconButtonProps={{
            disabled: loading || (isServerSide && muiLast && muiPage + 1 >= muiLast),
          }}
          backIconButtonProps={{
            disabled: loading || muiPage === 0,
          }}
          sx={{ ml: "auto" }}
        />
      </Box>

      {/* Filters */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filterableColumns={filterableColumns}
        filters={activeFilters}
        activeFilterCount={activeFilterCount2}
        onFilterChange={handleDraftFilterChange}
        onClearAll={handleFilterClearAll}
        onApply={handleFilterApply}
      />
    </Paper>
  );
};

export default SmartTable;