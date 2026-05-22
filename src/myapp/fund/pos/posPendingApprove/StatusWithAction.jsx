import React, { useState } from 'react';

import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';

import { Box } from '@mui/system';
import { CloseCircleTwoTone } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
// import { handleApproveReject } from './api/TransactionApi';
import { colorMap } from '../../../../shared/Constants';
import { stopLoading, startLoading } from '../../../../store/slices/loaderSlice';
import { handleApproveReject } from './TransactionApi';

const StatusWithActions = ({ row }) => {
  const navigate = useNavigate();
  const status = row.status?.toLowerCase();

  // ---------------- Status Colors ----------------

  const colors = colorMap[status] || {
    bg: '#6B7280',
    text: '#ffffff',
    border: '#4B5563'
  };

  // ---------------- Menu ----------------

  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ---------------- Dialog ----------------

  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: row?.card_holder || '',
    mobile: row?.mobile || '',
    amount: row?.amount || '',
    utr: row?.utr || '',
    refNo: row?.apitxnid || '',
    status: '',
    rejectMessage: ''
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const dispatch = useDispatch();

  // ---------------- Form ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    dispatch(startLoading());
    try {
      if (!formData.status) {
        toast.error('Please select action (Approve / Reject)');
        return;
      }

      if (formData.rejectMessage === 'rejected' && !formData.rejectMessage.trim()) {
        toast.error('Please enter reject reason');
        return;
      }

      const res = await handleApproveReject({ id: row.id, reason: formData.rejectMessage, type: formData.status }); // --- API CALL HERE ---
      // API CALL HERE

      if (res.status === 'SUCCESS') {
        toast.success(res.message || `${formData.status} successfully`);
        setFormData((prev) => ({
          ...prev,
          status: '',
          rejectMessage: ''
        }));
        handleDialogClose();
      } else {
        toast.error(res.message || `Failed to ${formData.status}`);
        return;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || `Failed to ${formData.status}`);
    } finally {
      dispatch(stopLoading());
    }
  };

  // ---------------- Invoice ----------------

  const printInvoice = () => {
    navigate(`/invoice/${row.txnid}`);
    handleMenuClose();
  };

  return (
    <>
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
        <IconButton size="small" onClick={handleMenuClick}>
          <MoreVertIcon fontSize="small" />
        </IconButton>

        {/* Menu */}
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handleDialogOpen}>Approve / Reject</MenuItem>

          <MenuItem onClick={printInvoice}>Invoice</MenuItem>
        </Menu>
      </Stack>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            pt: 2
          }}
        >
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Action Request</DialogTitle>

          {/* X Close Button */}
          <IconButton onClick={handleDialogClose}>
            <CloseCircleTwoTone />
          </IconButton>
        </Box>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              disabled
              InputProps={{
                sx: {
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,

                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000',
                    color: '#000',
                    fontWeight: 500,
                    cursor: 'not-allowed'
                  }
                }
              }}
            />

            <TextField
              label="Mobile"
              name="mobile"
              fullWidth
              value={formData.mobile}
              onChange={handleChange}
              disabled
              InputProps={{
                sx: {
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,

                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000',
                    color: '#000',
                    fontWeight: 500,
                    cursor: 'not-allowed'
                  }
                }
              }}
            />

            <TextField
              label="Amount"
              name="amount"
              type="number"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
              disabled
              InputProps={{
                sx: {
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,

                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000',
                    color: '#000',
                    fontWeight: 500,
                    cursor: 'not-allowed'
                  }
                }
              }}
            />

            <TextField
              label="UTR"
              name="utr"
              fullWidth
              value={formData.utr}
              onChange={handleChange}
              disabled
              InputProps={{
                sx: {
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,

                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000',
                    color: '#000',
                    fontWeight: 500,
                    cursor: 'not-allowed'
                  }
                }
              }}
            />

            <TextField
              label="Txn Id"
              name="refNo"
              fullWidth
              value={formData.refNo}
              onChange={handleChange}
              disabled
              InputProps={{
                sx: {
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,

                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000',
                    color: '#000',
                    fontWeight: 500,
                    cursor: 'not-allowed'
                  }
                }
              }}
            />

            <TextField select label="Status" name="status" fullWidth value={formData.status} onChange={handleChange}>
              <MenuItem value="approve">Approve</MenuItem>

              <MenuItem value="reject">Reject</MenuItem>
            </TextField>

            {formData.status === 'reject' && (
              <TextField
                label="Reject Message"
                name="rejectMessage"
                multiline
                rows={3}
                fullWidth
                value={formData.rejectMessage}
                onChange={handleChange}
              />
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} color="inherit">
            Close
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatusWithActions;
