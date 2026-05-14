import React, { useState } from 'react';

import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { step3PanVerify, updateProfile } from './helper/kycApi';
import toast from 'react-hot-toast';

function PanCard({ handleNext,user }) {
  const [panNumber, setPanNumber] = useState('');

  // Verify PAN
  const handleVerifyPan = async () => {
    console.log({
      panNumber
    });
    const response = await step3PanVerify({
      panNumber: panNumber
    });
console.log(response)
    if (response?.statuscode !== 'TXN') {
      toast.error(response?.message || 'Failed to verify PAN card');
      return;
    } else {
      toast.success(response?.message || 'PAN card verified successfully');
    }

    // API CALL HERE


        let payload = {
          progress: 3,
          user_id: user?.id
        };
        const res = updateProfile(payload);
        if (res?.statuscode === 'TXN') {
          toast.success(res?.message || 'Profile updated successfully');
        } else {
          toast.error(res?.message || 'Failed to update profile');
          return;
        }

    handleNext();
  };

  return (
    <Box>
      {/* Heading */}
      <Typography variant="h5" fontWeight={700} mb={1}>
        PAN Card Verification
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Enter your PAN card number for verification
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
        {/* PAN Number */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="PAN Card Number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
            placeholder="ABCDE1234F"
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
        <Button variant="contained" onClick={handleVerifyPan}>
          Verify & Continue
        </Button>
      </Box>
    </Box>
  );
}

export default PanCard;
