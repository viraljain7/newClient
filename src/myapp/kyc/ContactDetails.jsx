import React, { useEffect, useState } from 'react';

import { Box, Grid, TextField, Typography, Button, MenuItem } from '@mui/material';
import { useStep1 } from './helper/useStep1';
import toast from 'react-hot-toast';

function ContactDetails({ handleNext, user }) {
  const [showOtp, setShowOtp] = useState(false);

  const { submitContactDetails, sendOtp, verifyOtp, contactDetailsState, otpState, verifyOtpState } = useStep1();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    businessType: '',
    shopAddress: '',
    city: '',
    pincode: '',
    otp: ''
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullName: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || ''
    }));
  }, []);

  const businessTypes = ['Individual', 'Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Public Limited'];

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ==============================
  // SEND OTP
  // ==============================
  const handleSendOtp = async () => {
    try {
      // SEND OTP
      const otpRes = await sendOtp();

      // HANDLE OTP RESPONSE
      if (otpRes?.statuscode !== 'TXN') {
        toast.error(otpRes?.message || 'Failed to send OTP');
        return;
      }

      toast.success(otpRes?.message);

      setShowOtp(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Something went wrong');
    }
  };
  // ==============================
  // VERIFY OTP + SUBMIT
  // ==============================
  const handleSubmit = async () => {
    try {
      const otpRes = await verifyOtp({
        otp: formData.otp
      });

      // HANDLE API RESPONSE
      if (otpRes?.statuscode !== 'TXN') {
        toast.error(otpRes?.message || 'Failed to submit details');
        return;
      }
      toast.success(otpRes?.message);

      const contactRes = await submitContactDetails({
        user_id: Number(user?.id),
        business_type: formData.businessType,
        address: formData.shopAddress,
        city: formData.city,
        pincode: formData.pincode
      });

      // HANDLE API RESPONSE
      if (contactRes?.statuscode !== 'TXN') {
        toast.error(contactRes?.message || 'Failed to submit details');
        return;
      }

      toast.success(contactRes?.message);

      handleNext();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {/* Heading */}
      <Typography variant="h5" fontWeight={700} mb={1}>
        Contact Details
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        Fill your business and personal information
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
        {/* Full Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Full Name"
            disabled
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Email Address"
            disabled
          />
        </Grid>

        {/* Mobile */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Mobile Number"
            disabled
          />
        </Grid>

        {/* Business Type */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Business Type"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Business Type"
          >
            {businessTypes.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Shop Address */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Shop Address"
            name="shopAddress"
            value={formData.shopAddress}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Shop Address"
          />
        </Grid>

        {/* City */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="City"
          />
        </Grid>

        {/* Pincode */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Pincode"
            inputProps={{
              maxLength: 6
            }}
          />
        </Grid>

        {/* Send OTP Button */}
        {!showOtp && (
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSendOtp}>
              Send OTP
            </Button>
          </Grid>
        )}

        {/* OTP Input */}
        {showOtp && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              placeholder="Enter OTP"
            />
          </Grid>
        )}
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

export default ContactDetails;
