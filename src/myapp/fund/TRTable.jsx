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
  Skeleton
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import useFund from './helper/useFund';
import TransferReturnDrawer from './helper/TransferReturnDrawer';

/* ================= SKELETON ================= */
const TableSkeleton = ({ rows = 5 }) => {
  return [...Array(rows)].map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton width="10%" height={16} />

        <Skeleton width="60%" height={20} />
        <Skeleton width="40%" height={16} />
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
    </TableRow>
  ));
};

/* ================= MAIN COMPONENT ================= */
export default function TRTable() {
  //   const { data, total, loading, states, addAgent,  } = useMember(agentType);

  const { users: data, loading, error, total } = useFund();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [search, setSearch] = React.useState('');

  const[userData,setUserData]= React.useState(null);



  const [openDrawer,setOpenDrawer]=React.useState(false)

  //   🔥 Mapping
  const rows = React.useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      status: item.status === 'active',
      name: `${item.name} (${item.id})`,
      parent: item.parent || null,
      mobile: item.mobile,
      time: item.created_at,
      role: item.role.name,
      mainbalance:item.mainbalance
    }));
  }, [data]);

  // 🔍 Search
  const filteredRows = rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.mobile.includes(search));

  const visibleRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const trHandler=(data)=>{
    setOpenDrawer(true)
    setUserData(data)
}


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
              <TableCell>Sr</TableCell>
              <TableCell>User Details</TableCell>
              <TableCell>Parent Details</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} />
            ) : (
              visibleRows
                .filter((obj, idx) => obj.id !== 1)
                .map((row, idx) => {
                  const dateObj = new Date(row.time);

                  const date = dateObj.toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata'
                  });

                  const time = dateObj.toLocaleTimeString('en-IN', {
                    timeZone: 'Asia/Kolkata'
                  });

                  return (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {idx + 1}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {date}
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {time}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography fontWeight={600}>{row.name}</Typography>
                        <Typography variant="body2" fontWeight={600} color="text.secondary">
                          {row.mobile}
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="primary.main">
                          {row.role}
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
                        <IconButton
                          sx={{
                            border: '1px solid #ddd',
                            borderRadius: 2
                          }}
                        >
                          <SwapHorizIcon fontSize="small"  onClick={()=>trHandler(row)}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
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

      <TransferReturnDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}  data={userData}/>
    </Paper>
  );
}
