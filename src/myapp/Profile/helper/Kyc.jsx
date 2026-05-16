import { useEffect, useState } from 'react';

import { Box, Button, Grid, MenuItem, Stack, Typography } from '@mui/material';

import { CustomInput, TabPanel } from '../UserProfile';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

function Kyc({ tab, userDetails, handleUpdateKycStatus, refetchUserDetails }) {
  const [form, setForm] = useState({
    kyc_type: ''
  });

  useEffect(() => {
    if (userDetails?.kyc) {
      setForm({
        kyc_type: userDetails?.kyc
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
     const response = await handleUpdateKycStatus({
        user_id: userDetails?.id,
        status: form.kyc_type
      });

      toast.success(response?.message || 'KYC status updated successfully');
      await refetchUserDetails({
        user_id: userDetails?.id
      });
    } catch (error) {
      toast.error('Failed to update KYC status', error?.response?.data?.message || '');
      console.log(error);
    }
  };

  return (
    <TabPanel value={tab} index={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput select label="KYC Status" name="kyc_type" value={form.kyc_type} onChange={handleChange}>
            <MenuItem value="verified">Verified</MenuItem>

            <MenuItem value="pending">Pending</MenuItem>

            <MenuItem value="submitted">Submitted</MenuItem>

            <MenuItem value="rejected">Rejected</MenuItem>
          </CustomInput>
        </Grid>

        {/* DOCUMENTS */}

        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Uploaded Documents
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack
            direction={{
              xs: 'column',
              md: 'row'
            }}
            spacing={2}
          >
            {/* SHOP IMAGE */}

            {userDetails?.shop_image && (
              <Box>
                <Typography fontSize={13} mb={1} fontWeight={600}>
                  Shop Image
                </Typography>
                <Link to={import.meta.env.VITE_IMG_URL + userDetails?.shop_image} target="_blank">
                  <Box
                    component="img"
                    src={import.meta.env.VITE_IMG_URL + userDetails?.shop_image}
                    alt="Shop"
                    sx={{
                      width: 180,
                      height: 120,
                      borderRadius: 2,
                      objectFit: 'cover',
                      border: '1px solid #E5E7EB'
                    }}
                  />
                </Link>
              </Box>
            )}

            {/* MERCHANT VIDEO */}

            {userDetails?.merchant_video && (
              <Box>
                <Typography fontSize={13} mb={1} fontWeight={600}>
                  Merchant Video
                </Typography>

                <Link to={import.meta.env.VITE_IMG_URL + userDetails?.merchant_video} target="_blank">
                  <Box
                    component="video"
                    controls
                    src={import.meta.env.VITE_IMG_URL + userDetails?.merchant_video}
                    sx={{
                      width: 220,
                      height: 120,
                      borderRadius: 2,
                      border: '1px solid #E5E7EB'
                    }}
                  />
                </Link>
              </Box>
            )}

            {/* SELFIE */}

            {userDetails?.merchant_selfie && (
              <Box>
                <Typography fontSize={13} mb={1} fontWeight={600}>
                  Merchant Selfie
                </Typography>
                <Link to={import.meta.env.VITE_IMG_URL + userDetails?.merchant_selfie} target="_blank">
                  <Box
                    component="img"
                    src={import.meta.env.VITE_IMG_URL + userDetails?.merchant_selfie}
                    alt="Selfie"
                    sx={{
                      width: 180,
                      height: 100,
                      objectFit: 'cover',
                      border: '1px solid #E5E7EB'
                    }}
                  />
                </Link>
              </Box>
            )}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Update KYC Status
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default Kyc;
