import React, { useState } from 'react';

import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useStep4 } from './helper/useStep4';
import { updateProfile } from './helper/kycApi';

function BankDetails({ handleNext, user }) {
  const [formData, setFormData] = useState({
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: ''
  });

  const { verifyBank } = useStep4();

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit
  const handleSubmit = async () => {
    // Account Match Validation
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      toast.error('Account numbers do not match');
      return;
    }

    const res = await verifyBank({
      accNumber: formData.accountNumber,
      ifsccode: formData.ifscCode
    });

    if (res?.statuscode !== 'TXN') {
      toast.error(res?.message || 'Failed to verify bank details');
      return;
    }

    toast.success(res?.message || 'Bank details verified successfully');

    let payload = {
      progress: 4,
      user_id: user?.id
    };
    const resp = updateProfile(payload);
    if (resp?.statuscode === 'TXN') {
      toast.success(resp?.message || 'Profile updated successfully');
    } else {
      toast.error(resp?.message || 'Failed to update profile');
      return;
    }

    handleNext();

    handleNext();
  };

  return (
    <Box>
      {/* Heading */}
      <Typography variant="h5" fontWeight={700} mb={1}>
        Bank Details
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Enter your bank account information
      </Typography>

      {/* Form */}
      <Grid
        container
        spacing={3}
        direction="column"
        sx={{
          '& .MuiInputLabel-root': {
            fontSize: '18px',
            fontWeight: 600
          },

          '& .MuiInputBase-input': {
            fontSize: '16px'
          }
        }}
      >
        {/* Account Number */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bank Account Number"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Enter your bank account number"
          />
        </Grid>

        {/* Confirm Account Number */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Account Number"
            name="confirmAccountNumber"
            value={formData.confirmAccountNumber}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Re-enter your bank account number"
          />
        </Grid>

        {/* IFSC Code */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="IFSC Code"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ifscCode: e.target.value.toUpperCase()
              }))
            }
            placeholder="SBIN0001234"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>

      {/* Footer Buttons */}
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Submit & Continue
        </Button>
      </Box>
    </Box>
  );
}

export default BankDetails;
