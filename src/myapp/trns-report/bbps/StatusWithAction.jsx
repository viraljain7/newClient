import React, { useState } from 'react';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate } from 'react-router';

import { colorMap } from '../../../shared/Constants';
import { handleEditApi } from './api/TransactionApi';
import toast from 'react-hot-toast';
import { startLoading, stopLoading } from '../../../store/slices/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';

const StatusWithActions = ({ row }) => {
  const navigate = useNavigate();

  const status = row.status?.toLowerCase();
  const userRole = useSelector((state) => state?.user?.profile?.role?.name);

  // ---------------- Status Colors ----------------

  const colors = colorMap[status] || {
    bg: '#6B7280',
    text: '#ffffff',
    border: '#4B5563'
  };

  // ---------------- Menu ----------------

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ---------------- Dialog ----------------

  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: row?.id,
    amount: row?.amount || '',
    utr: row?.utr || '',
    status: row?.status || '',
    name: row?.user?.name || ''
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);

    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // ---------------- Form Change ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ---------------- Submit ----------------
  const dispatch = useDispatch();
  const handleEdit = async () => {
    dispatch(startLoading());
    try {
      const data = await handleEditApi({
        txnid: formData.id,
        utr: formData.utr,
        status: formData.status
      });

      if (data.statuscode === 'TXN') {
        toast.success(data.message);
        setFormData({
          utr: '',
          status: ''
        });
      } else {
        toast.error(data.message);
        return;
      }

      handleDialogClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  // ---------------- Invoice ----------------

  const printInvoice = () => {
    navigate(`/invoice/${row.txnid}`);

    handleClose();
  };

  return (
    <>
      {/* ---------------- Actions ---------------- */}

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Status Chip */}
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

        {/* Action Button */}
        <IconButton size="small" onClick={handleClick}>
          <MoreVertIcon fontSize="small" />
        </IconButton>

        {/* Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {(userRole === 'Admin' || userRole === 'Subadmin') && <MenuItem onClick={handleDialogOpen}>Edit Status</MenuItem>}

          <MenuItem onClick={printInvoice}>Invoice</MenuItem>
        </Menu>
      </Stack>

      {/* ---------------- Dialog ---------------- */}

      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Update Transaction</DialogTitle>

          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={2}>
            {/* Amount */}

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Name
              </Typography>

              <TextField
                fullWidth
                name="amount"
                value={formData.name}
                onChange={handleChange}
                disabled
                InputProps={{
                  sx: {
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000',
                      color: '#000',
                      fontWeight: 600
                    }
                  }
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Amount
              </Typography>

              <TextField
                disabled
                fullWidth
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                InputProps={{
                  sx: {
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000',
                      color: '#000',
                      fontWeight: 600
                    }
                  }
                }}
              />
            </Box>

            {/* UTR */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                UTR Number
              </Typography>

              <TextField fullWidth name="utr" placeholder="Enter UTR Number" value={formData.utr} onChange={handleChange} />
            </Box>

            {/* Status */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Status
              </Typography>

              <TextField select fullWidth name="status" value={formData.status} onChange={handleChange}>
                <MenuItem value="pending">Pending</MenuItem>

                <MenuItem value="success">Success</MenuItem>

                <MenuItem value="failed">Failed</MenuItem>
              </TextField>
            </Box>
          </Stack>
        </DialogContent>

        {/* Footer */}
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="outlined" onClick={handleDialogClose}>
            Close
          </Button>

          <Button variant="contained" onClick={handleEdit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatusWithActions;
