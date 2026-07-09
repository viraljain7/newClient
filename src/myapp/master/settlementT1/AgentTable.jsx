import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Typography,
  Skeleton,
  MenuItem,
  Backdrop,
  CircularProgress,
  Checkbox
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router';
import { Stack, width } from '@mui/system';
import { BlueButton } from '../../../components/CommonComponent';
import { createSettlementTransfer, fetchSettlements } from './memberApi';
import toast from 'react-hot-toast';

import { startLoading, stopLoading } from '../../../store/slices/loaderSlice.js';
import { useDispatch } from 'react-redux';

/* ================= WALLET DROPDOWN ================= */
const WalletDetails = ({ wallet }) => {
  return <MenuItem sx={{ color: 'red !important', fontSize: 12, textAlign: 'center' }}>₹ {wallet}</MenuItem>;
};

/* ================= SKELETON ================= */
const TableSkeleton = ({ rows = 5 }) => {
  return [...Array(rows)].map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton variant="rounded" width={40} height={24} />
      </TableCell>

      <TableCell>
        <Skeleton width="60%" height={20} />
        <Skeleton width="40%" height={16} />
      </TableCell>

      <TableCell>
        <Skeleton width="50%" height={20} />
        <Skeleton width="30%" height={16} />
      </TableCell>

      <TableCell align="center">
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>

      <TableCell align="center">
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>
    </TableRow>
  ));
};

/* ================= MAIN COMPONENT ================= */
export default function AgentTable({ }) {
  fetchSettlements();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getSettlements = async () => {
      try {
        const res = await fetchSettlements();
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getSettlements();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [search, setSearch] = React.useState('');

  // ✅ Separate loading state only for the Backdrop (triggered by drawer actions)
  const [backdropLoading, setBackdropLoading] = React.useState(false);

  // 🔥 Mapping
  const rows = React.useMemo(() => {
    return data.map((item) => ({
      id: item?.id,
      name: `${item?.name} (${item?.id})`,
      mobile: item?.mobile,
      already_transferred: item?.already_transferred,
      eligible_amount: item?.eligible_amount,
      available_settlement: item?.available_settlement,
    }));
  }, [data]);

  // 🔍 Search + Filter
  const filteredRows = rows.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.mobile.includes(search);
  

    return matchesSearch;
  });

  const visibleRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  console.log(visibleRows)

  const navigate = useNavigate();
  // State for bulk settlement remark
  const [bulkRemark, setBulkRemark] = React.useState('');

  // State for selected users
  const [selectedIds, setSelectedIds] = React.useState([]);
  const dispatch = useDispatch();

  const handleBulkSettlement = React.useCallback(async () => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one user for settlement');
      return;
    }
    if (!bulkRemark.trim()) {
      toast.error('Please enter a settlement remark');
      return;
    }

    setBackdropLoading(true);
    dispatch(startLoading());

    try {
      const transfers = selectedIds.map((userId, i) => {
        const row = rows.find((r) => r.id === userId);
        return {
          user_id: userId,
          amount: row.available_settlement,
          txnid: `STL${userId}${Date.now()}${i}`,
          remark: bulkRemark
        };
      });

      const results = await Promise.allSettled(transfers.map((payload) => createSettlementTransfer(payload)));

      const succeeded = results.filter((r) => r.status === 'fulfilled');
      const failed = results.filter((r) => r.status === 'rejected');

      if (succeeded.length) toast.success(`${succeeded.length} settlement(s) successful`);
      if (failed.length) toast.error(`${failed.length} settlement(s) failed`);

      setSelectedIds([]);
      setBulkRemark('');
      // refetch();
    } catch (err) {
      // Only hits if something outside Promise.allSettled throws
      // e.g. rows.find() returning undefined, or a sync error in the map
      toast.error('Unexpected error during settlement');
      console.error(err);
    } finally {
      setBackdropLoading(false);
      dispatch(stopLoading());
    }
  }, [selectedIds, bulkRemark, rows]);

  const handleRowSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const allSelected = visibleRows.length > 0 && visibleRows.every((r) => selectedIds.includes(r.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleRows.find((r) => r.id === id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...visibleRows.map((r) => r.id)])]);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #e0e0e0'
      }}
    >
      <Backdrop
        open={backdropLoading}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* 🔥 Top Bar */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #eee'
        }}
      >
        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ width: 'auto' }}
        />
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* check for all selected */}

          <Checkbox checked={allSelected} onChange={handleSelectAll} size="small" />

          {/* Remark Input */}
          <TextField
            className="form-control form-control-sm"
            placeholder="Settlement Remark"
            size="medium"
            value={bulkRemark}
            onChange={(e) => setBulkRemark(e.target.value)}
          />

          <BlueButton label="Apply" sx={{ width: '100px' }} onClick={handleBulkSettlement} />
        </Stack>
      </Box>

      {/* 📊 Table */}
      <TableContainer>
        <Table
          sx={{
            '& th': {
              fontWeight: 600,
              backgroundColor: '#fafafa'
            },
            '& td, & th': {
              borderBottom: '1px solid #eee'
            },
            '& .MuiTableCell-root': { border: '1px solid', borderColor: 'divider' },
            '& .MuiTableHead-root .MuiTableCell-root': {
              fontWeight: 700,
              backgroundColor: 'grey.100'
            }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>RT Details</TableCell>
              <TableCell>T+1 Amount</TableCell>
              <TableCell align="center">Already Transferred</TableCell>
              <TableCell align="center">Available T+1 Settlement Amount</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} />
            ) : visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">No data found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedIds.includes(row.id)} onChange={() => handleRowSelect(row.id)} size="small" />
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>{row.name}</Typography>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      {row.mobile}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <WalletDetails wallet={row.eligible_amount} />
                  </TableCell>

                  <TableCell align="center">
                    <WalletDetails wallet={row.already_transferred} />
                  </TableCell>

                  <TableCell align="center">
                    <WalletDetails wallet={row.available_settlement} />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2
                      }}
                      onClick={() => navigate(`/userprofile/${row.id}`)}
                    >
                      <SettingsIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📄 Pagination */}
      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[25, 50, 100, 500]}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        sx={{ borderTop: '1px solid #eee' }}
      />
    </Paper>
  );
}
