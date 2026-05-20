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
  TextField,
  Typography,
  Skeleton
} from '@mui/material';

import useServiceManager from './useServiceManager';
// import { productName } from '../../../utils/productName';

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
    </TableRow>
  ));
};

/* ================= MAIN COMPONENT ================= */

export default function ServiceTable() {
  const { services, loading, getServiceList, handleUpdateService } = useServiceManager();

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const [search, setSearch] = React.useState('');

  /* ================= FETCH ================= */

  React.useEffect(() => {
    getServiceList();
  }, []);

  /* ================= MAPPING ================= */

  const rows = React.useMemo(() => {
    return services.map((item) => ({
      id: item?.id,

      status: item?.value === '1',

      name: `${item?.name || '-'}`
    }));
  }, [services]);

  /* ================= SEARCH ================= */

  const filteredRows = rows.filter((r) => r?.name?.toLowerCase().includes(search.toLowerCase()));

  const visibleRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  /* ================= STATUS UPDATE ================= */

  const handleToggleStatus = async (row) => {
    try {
      const updatedValue = row.status ? '0' : '1';

      await handleUpdateService({
        provider_id: row.id,
        value: updatedValue
      });

      await getServiceList();
    } catch (error) {
      console.log(error);
    }
  };

  const getProductName = (name) => {
    if (name === 'Payu Education') return 'Silver 1 (nixa-Razorpay)';
    else if (name === 'Zwitch') return 'Diamond 3 (nixasilver 2 Coastlink)';
    else if (name === 'Paytm') return 'Silver 2';
    else if (name === 'Payu Cruise') return 'Diamond 2';
    else if (name === 'Domestic Remittance') return 'Payout';
    else if (name === 'CF PG 5') return 'Premium 1';
    else if (name === 'Premium PG 6') return 'Premium 2';
    else if (name === 'Premium PG 7') return 'Premium 3 (Yana Cashfree pg 2)';
    else if (name === 'Premium PG 8') return 'Premium 4 (Yana Razorpay pg 3)';
    else if (name === 'Premium PG 9') return 'Silver 2 (yanedu smartpg4 razorpay)';
    else if (name === 'Premium PG 10') return 'Diamond 2 (cruyana diamondpg1 razorpay)';
    else if (name === 'online credit card') return 'BBPS';
  
    else return name; // rest unchanged
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
          sx={{ minWidth: '150px' }}
        />
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

              <TableCell>Service Details</TableCell>
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
                    <Switch checked={row.status} size="small" onChange={() => handleToggleStatus(row)} />
                  </TableCell>

                  {/* DETAILS */}

                  <TableCell>
                    <Typography fontWeight={600}>{getProductName(row.name)}</Typography>
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
        count={filteredRows.length}
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
    </Paper>
  );
}
