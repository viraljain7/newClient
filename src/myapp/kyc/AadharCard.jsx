import React, { useState } from 'react';

import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useStep2 } from './helper/useStep2';
import toast from 'react-hot-toast';
import { updateProfile } from './helper/kycApi';

function AadharCard({ handleNext, user }) {
  const [mobileNumber, setMobileNumber] = useState('');

  const {
    verifyAadhaarMobile,
    initiateDigiLocker,
    resetStep2States,

    verifyMobileState,
    digilockerState
  } = useStep2();

  // Submit
  const handleSubmit = async () => {
    console.log({
      aadharLinkedMobile: mobileNumber
    });

    const verifyResponse = await verifyAadhaarMobile({
      mobile: mobileNumber
    });
    console.log(verifyResponse);

    if (verifyResponse.statuscode !== 'TXN') {
      toast.error(verifyResponse?.message || 'Failed to verify mobile number');
      return;
    }

    const initiateResponse = await initiateDigiLocker();
    if (initiateResponse.statuscode !== 'TXN') {
      toast.error(initiateResponse?.message || 'Failed to initiate DigiLocker');
      return;
    }
    window.location.replace(initiateResponse.redirect_url);

    // API CALL HERE

    let payload = {
      progress: 2,
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
        Aadhar Verification
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Enter your Aadhar linked mobile number
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
        {/* Mobile Number */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Aadhar Linked Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Enter 10 digit mobile number linked with Aadhar"
            inputProps={{
              maxLength: 10
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

export default AadharCard;
