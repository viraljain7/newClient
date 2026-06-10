import { Chip, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { colorMap } from '../../../shared/Constants';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loaderSlice';
import { handleCheckStatusApi } from './api/TransactionApi';

const StatusWithActions = ({ row }) => {
  const status = row.status?.toLowerCase();

  const userRole = useSelector((state) => state?.user?.profile?.role?.name);

  // ---------------- Status Colors (Modern + Soft) ----------------

  const colors = colorMap[status] || {
    bg: '#6B7280',
    text: '#ffffff',
    border: '#4B5563'
  };

  // ---------------- Menu Logic ----------------
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const navigate = useNavigate();
  const printInvoice = () => {
    navigate(`/invoice/${row.txnid}`);
  };
  const dispatch = useDispatch();

  const handleCheckStatus = async (apitxnid) => {
    dispatch(startLoading());

    try {
      const data = await handleCheckStatusApi({ txnid: apitxnid });
      if (data.statuscode === 'TXN') {
        toast.success(data.message);
        handleClose();
      } else {
        toast.error(data.message);
        return;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {/* ✅ Status Chip */}
      <Chip
        label={status}
        size="small"
        sx={{
          minWidth: 60,
          fontWeight: 600,
          textTransform: 'capitalize',
          borderRadius: 2,

          backgroundColor: colors.bg,
          color: colors.text
        }}
      />

      {/* ✅ Action Button */}
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      {/* ✅ Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {(userRole === 'Admin' || userRole === 'Subadmin') && (
          <>
            {console.log(row)}
            <MenuItem onClick={() => handleCheckStatus(row.txnid)}>Check Status</MenuItem>
          </>
        )}
        <MenuItem onClick={printInvoice}>invoice</MenuItem>
      </Menu>
    </Stack>
  );
};

export default StatusWithActions;
