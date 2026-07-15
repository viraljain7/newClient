import * as React from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { useNavigate } from 'react-router';
import { BlueButton } from '../../../components/CommonComponent';

import { useMember } from './useMember';
import AddAgentDrawer from './AddAgentDrawer';

/* ================= WALLET MENU ================= */

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
          bgcolor: '#fafafa'
        }}
      >
        <AccountBalanceWalletIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem sx={{ fontSize: 12, fontWeight: 600 }}>Main Wallet : ₹ {wallet.main}</MenuItem>

        <MenuItem sx={{ fontSize: 12, fontWeight: 600 }}>Settlement : ₹ {wallet.settlementwallet}</MenuItem>

        <MenuItem sx={{ color: 'red', fontSize: 12 }}>Lock : ₹ {wallet.lock}</MenuItem>
      </Menu>
    </>
  );
};

/* ================= TABLE SKELETON ================= */

const TableSkeleton = ({ rows = 20 }) =>
  [...Array(rows)].map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton variant="rounded" width={42} height={24} />
      </TableCell>

      <TableCell>
        <Skeleton width="65%" />
        <Skeleton width="40%" />
      </TableCell>

      <TableCell>
        <Skeleton width="60%" />
        <Skeleton width="35%" />
      </TableCell>

      <TableCell align="center">
        <Skeleton variant="circular" width={34} height={34} />
      </TableCell>

      <TableCell align="center">
        <Skeleton variant="circular" width={34} height={34} />
      </TableCell>
    </TableRow>
  ));

/* ================= MAIN COMPONENT ================= */

export default function AgentTable({ agentType, agentCode }) {
  const navigate = useNavigate();

  const {
    data,
    total,
    loading,
    states,
    addAgent,
    refetch,

    currentPage,
    itemsPerPage,

    setCurrentPage,
    setItemsPerPage,

    setSearchTerm,
  } = useMember(agentType);

  const [search, setSearch] = React.useState('');

  const [filteredType, setFilteredType] = React.useState('all');

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [backdropLoading, setBackdropLoading] = React.useState(false);

  /* Mapping */

  const rows = React.useMemo(() => {
    return data.map((item) => ({
      id: item.id,

      status: item.status === 'active',

      name: `${item.name} (${item.id})`,

      mobile: item.mobile,

      parent: item.parent,

      wallet: {
        main: item.mainbalance,
        settlementwallet: item.settlementwallet,
        lock: item.lockamount
      },

      role: item.role?.name,

      kyc: item.kyc
    }));
  }, [data]);

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
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.modal + 1,
          backgroundColor: 'rgba(0,0,0,.45)'
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* ================= Toolbar ================= */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          p: 2,
          borderBottom: '1px solid #eee',
          flexWrap: 'wrap'
        }}
      >
        <TextField
          size="small"
          placeholder="Search Name / Mobile..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            setCurrentPage(1);

            setSearchTerm(value);
          }}
          sx={{ minWidth: 260 }}
        />

        <Stack direction="row" spacing={1.5}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={filteredType}
              onChange={(e) => {
                const value = e.target.value;

                setFilteredType(value);

                setCurrentPage(1);

              }}
            >
              <MenuItem value="all">All Users</MenuItem>

              <MenuItem value="submitted">Submitted KYC</MenuItem>

              <MenuItem value="verified">Verified KYC</MenuItem>

              <MenuItem value="pending">Pending KYC</MenuItem>
            </Select>
          </FormControl>

          <BlueButton sx={{ width: 'auto' }} label="+ Add New Agent" onClick={() => setOpenDrawer(true)} />
        </Stack>
      </Box>
      {/* ================= TABLE ================= */}
      <TableContainer>
        <Table
          sx={{
            '& th': {
              fontWeight: 700,
              backgroundColor: '#fafafa'
            },

            '& td,& th': {
              border: '1px solid',
              borderColor: 'divider'
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
              <TableSkeleton rows={itemsPerPage} />
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">No Users Found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Switch checked={row.status} size="small" />
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>{row.name}</Typography>

                    <Typography variant="body2" color="text.secondary">
                      {row.mobile}
                    </Typography>

                    <Typography variant="body2" color="primary" fontWeight={600}>
                      {row.role}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>
                      {row.parent?.name ?? '-'} ({row.parent?.id ?? '-'})
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {row.parent?.mobile ?? '-'}
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
      </TableContainer>{' '}
      {/* ================= PAGINATION ================= */}
      <TablePagination
        component="div"
        count={total}
        page={currentPage - 1} // MUI starts from 0
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[10, 20, 50, 100, 500]}
        onPageChange={(event, newPage) => {
          setCurrentPage(newPage + 1); // Laravel starts from 1
        }}
        onRowsPerPageChange={(event) => {
          const value = Number(event.target.value);

          setItemsPerPage(value);

          setCurrentPage(1);
        }}
        sx={{
          borderTop: '1px solid #eee'
        }}
      />
      {/* ================= ADD AGENT ================= */}
      <AddAgentDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        agentCode={agentCode}
        states={states}
        agentType={agentType}
        addAgent={addAgent}
        setLoading={setBackdropLoading}
        onSuccess={() => {
          setOpenDrawer(false);
          refetch();
          setBackdropLoading(false);
        }}
      />
    </Paper>
  );
}
