import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BlueButton, OutlineButton } from '../../../../components/CommonComponent';
import KycVerify from './KycVerify';
import toast from 'react-hot-toast';
import { fetchUserPayoutDetails } from '../payoutApi';

function PayoutMobile({ setPayoutUser, setLoading }) {
  const [mobile, setMobile] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (mobile.length !== 10) {
      toast.error('Enter valid mobile number');
      setLoading(false);

      return;
    }

    const res = await fetchUserPayoutDetails(mobile);

    if (res.statuscode == 'TXN') {
      toast.success(res.message);
      setPayoutUser(res.data);
    } else if (res.statuscode === 'KYC') {
      toast.error(res.message);
      setOpenDrawer(true);
      setPayoutUser(null);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  const reset = () => {
    setMobile('');
    setPayoutUser(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mobile.length === 10) {
        handleSubmit();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [mobile]);

  return (
    <>
      <Grid size={{ xs: 12, md: 5 }}>
        <Card
          sx={{
            border: '2px dashed #d1d5db',
            borderRadius: 3
          }}
        >
          <CardContent>
            <Typography fontWeight={700} mb={3}>
              Payout
            </Typography>

            <Box display="flex" flexDirection="column" gap={3}>
              {/* Mobile */}
              <Box>
                <Typography fontSize={13} mb={0.5} color="text.secondary">
                  Mobile Number
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!/^\d*$/.test(val)) return; // only numbers
                    setMobile(val);
                  }}
                  inputProps={{ maxLength: 10 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: '#f9fafb'
                    }
                  }}
                />
              </Box>

              {/* Buttons */}
              <Grid container spacing={2} mt={1}>
                <Grid size={{ xs: 6 }}>
                  <OutlineButton label="Clear" onClick={reset} />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <BlueButton label="Submit" onClick={handleSubmit} disabled={mobile.length !== 10} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        <KycVerify
          openDrawer={openDrawer}
          onClose={() => setOpenDrawer(false)}
          mobile={mobile}
          onSubmit={handleSubmit}
          setLoading={setLoading}
        />
      </Grid>
    </>
  );
}

export default PayoutMobile;
