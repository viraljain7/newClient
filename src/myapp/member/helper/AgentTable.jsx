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
  Skeleton,
  Menu,
  MenuItem
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useMember } from './useMember';
import { BlueButton } from '../../../components/CommonComponent';
import AddAgentDrawer from './AddAgentDrawer';

/* ================= WALLET DROPDOWN ================= */
const WalletDetails = ({ wallet }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#fafafa'
        }}
      >
        <AccountBalanceWalletIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem sx={{ fontSize: 12, fontWeight: 600 }}>Main Wallet: ₹ {wallet.main}</MenuItem>
        <MenuItem sx={{ fontSize: 12, fontWeight: 600 }}>Qr Wallet: ₹ {wallet.qr}</MenuItem>
        <MenuItem sx={{ fontSize: 12, fontWeight: 600 }}>Pg Wallet: ₹ {wallet.pg}</MenuItem>
        <MenuItem sx={{ fontSize: 12, fontWeight: 600 }}>Aeps Wallet: ₹ {wallet.aeps}</MenuItem>
        <MenuItem sx={{ color: 'red', fontSize: 12 }}>Lock Wallet: ₹ {wallet.lock}</MenuItem>
      </Menu>
    </>
  );
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
export default function AgentTable({ agentType, agentCode }) {
  const { data, total, loading, states, addAgent,  } = useMember(agentType);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [search, setSearch] = React.useState('');

  const [openDrawer, setOpenDrawer] = React.useState(false);

  // 🔥 Mapping
  const rows = React.useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      status: item.status === 'active',
      name: `${item.name} (${item.id})`,
      parent: item.parent || null,
      mobile: item.mobile,
      wallet: {
        main: item.mainbalance,
        qr: item.qrbalance,
        pg: item.pgbalance,
        aeps: item.aepsbalance,
        lock: item.lockamount
      }
    }));
  }, [data]);

  // 🔍 Search
  const filteredRows = rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.mobile.includes(search));

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

        <BlueButton sx={{ width: 'auto' }} label="+  Add New Agent" onClick={() => setOpenDrawer(true)} />
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
            }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>User Details</TableCell>
              <TableCell>Parent Details</TableCell>
              <TableCell align="center">Wallet</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} />
            ) : (
              visibleRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Switch checked={row.status} size="small" />
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>{row.name}</Typography>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      {row.mobile}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>
                      {row.parent?.name || '-'} ({row.parent.id})
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      {row.parent?.mobile || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <WalletDetails wallet={row.wallet} />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2
                      }}
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
        count={total}
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

      <AddAgentDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} agentCode={agentCode} states={states}/>
    </Paper>
  );
}
