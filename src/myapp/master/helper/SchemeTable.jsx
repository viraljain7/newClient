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
  Switch,
  IconButton,
  TextField,
  Typography,
  Skeleton
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

import { BlueButton, OutlineButton } from '../../../components/CommonComponent';
import useSchemeManager from './useSchmeManager';
import AddScheme from './AddScheme';
import { Stack } from '@mui/system';
import SchemeProducts from './SchemeProducts';
import { setSchemeId, setSchemeName } from '../../../store/slices/schemeSlice';
import { useDispatch } from 'react-redux';

/* ================= SKELETON ================= */

const TableSkeleton = ({ rows = 5 }) => {
  return [...Array(rows)].map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton variant="rounded" width={40} height={24} />
      </TableCell>

      <TableCell>
        <Skeleton width="60%" height={20} />
      </TableCell>

      <TableCell align="center">
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>
    </TableRow>
  ));
};

/* ================= MAIN COMPONENT ================= */

export default function SchemeTable() {
  const { data = [], total = 0, loading, getSchemeList } = useSchemeManager();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [search, setSearch] = React.useState('');

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openProductsDrawer, setOpenProductsDrawer] = React.useState(false);

  const dispatch = useDispatch();

  /* ================= FETCH ================= */

  React.useEffect(() => {
    getSchemeList();
  }, []);
  /* ================= MAPPING ================= */

  const rows = React.useMemo(() => {
    return data.map((item) => ({
      id: item?.id,
      status: item?.status === '1',

      name: `${item?.name || '-'} (${item?.id || '-'})`
    }));
  }, [data]);

  /* ================= SEARCH ================= */

  const filteredRows = rows.filter((r) => r?.name?.toLowerCase().includes(search.toLowerCase()) || r?.mobile?.includes(search));

  const visibleRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid #e0e0e0'
      }}
    >
      {/* ================= TOP BAR ================= */}

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
          sx={{ minWidth: '100px' }}
        />
        <Stack direction="row" spacing={2}>
          <OutlineButton sx={{ width: 'auto' }} label="Refresh" onClick={getSchemeList} />

          <BlueButton sx={{ width: 'auto' }} label="+ Add Scheme" onClick={() => setOpenDrawer(true)} />
        </Stack>
      </Box>

      {/* ================= TABLE ================= */}

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

            '& .MuiTableCell-root': {
              border: '1px solid',
              borderColor: 'divider'
            },

            '& .MuiTableHead-root .MuiTableCell-root': {
              fontWeight: 700,
              backgroundColor: 'grey.100'
            }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>User Details</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} />
            ) : visibleRows.length > 0 ? (
              visibleRows.map((row) => (
                <TableRow key={row.id} hover>
                  {/* STATUS */}

                  <TableCell>
                    <Switch checked={row.status} size="small" />
                  </TableCell>

                  {/* USER DETAILS */}

                  <TableCell>
                    <Typography fontWeight={600}>{row.name}</Typography>
                  </TableCell>

                  {/* ACTION */}

                  <TableCell align="center">
                    <IconButton
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2
                      }}
                      onClick={() => {
                        setOpenProductsDrawer(true);
                        dispatch(setSchemeId(row.id));
                        dispatch(setSchemeName(row.name));
                      }}
                    >
                      <SettingsIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <Typography variant="body1" fontWeight={600} color="text.secondary">
                    No Data Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ================= PAGINATION ================= */}

      <TablePagination
        component="div"
        count={filteredRows.length || total}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[25, 50, 100, 500]}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        sx={{
          borderTop: '1px solid #eee'
        }}
      />
      <AddScheme open={openDrawer} onClose={() => setOpenDrawer(false)} onSuccess={getSchemeList} />
      <SchemeProducts open={openProductsDrawer} onClose={() => setOpenProductsDrawer(false)} />
    </Paper>
  );
}
