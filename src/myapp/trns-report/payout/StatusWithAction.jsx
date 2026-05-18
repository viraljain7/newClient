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
  Grid,
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
  // ---------------- Status ----------------
  const status = row.status?.toLowerCase();

  const userRole=useSelector(state=>state?.user?.profile?.role?.name)

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

  const handleDialogOpen = () => {
    setDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // ---------------- Edit State ----------------

  const [editData, setEditData] = useState({
    status: row.status || '',
    utr: row.utr || ''
  });

  // ---------------- Invoice ----------------

  const printInvoice = () => {
    navigate(`/invoice/${row.txnid}`);

    handleClose();
  };

  // ---------------- Handle Edit ----------------
  const dispatch = useDispatch();
  const handleEdit = async () => {
    dispatch(startLoading());

    try {
      const data = await handleEditApi({
        txnid: row.id,
        utr: editData.utr,
        status: editData.status
      });

      if (data.statuscode === 'TXN') {
        toast.success(data.message);
        setEditData({
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
      console.error(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <>
      {/* ---------------- Table Actions ---------------- */}

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Status Chip */}
        <Chip
          label={status}
          size="small"
          sx={{
            minWidth: 70,
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
      {(userRole==="Admin"||userRole==="Subadmin")&&    <MenuItem onClick={handleDialogOpen}>Edit Status</MenuItem>}

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
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Transaction Details</DialogTitle>

          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={2}>
            {/* Beneficiary Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Beneficiary Name
              </Typography>

              <Typography fontWeight={600}>{row.optional2}</Typography>
            </Grid>

            {/* Bank Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Bank Name
              </Typography>

              <Typography fontWeight={600}>{row.optional3}</Typography>
            </Grid>

            {/* Account Number */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Account Number
              </Typography>

              <Typography fontWeight={600}>{row.optional4}</Typography>
            </Grid>

            {/* IFSC */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                IFSC
              </Typography>

              <Typography fontWeight={600}>{row.optional5}</Typography>
            </Grid>

            {/* Amount */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Amount
              </Typography>

              <Typography fontWeight={700}>₹ {row.amount}</Typography>
            </Grid>

            {/* Status */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Status
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                value={editData.status}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    status: e.target.value
                  }))
                }
              >
                <MenuItem value="pending">Pending</MenuItem>

                <MenuItem value="success">Success</MenuItem>

                <MenuItem value="failed">Failed</MenuItem>
              </TextField>
            </Grid>

            {/* UTR */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                UTR Number
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Enter UTR Number"
                value={editData.utr}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    utr: e.target.value
                  }))
                }
              />
            </Grid>
          </Grid>
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
