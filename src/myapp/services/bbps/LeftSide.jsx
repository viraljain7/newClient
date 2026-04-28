import { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { fetchBill } from './bbpsApi';
import toast from 'react-hot-toast';

function LeftSide({ cardDetails, setBill,setLoading }) {
  let { title, code } = cardDetails;
  const [mobile, setMobile] = useState('');
  const [cardLast4, setCardLast4] = useState('');

  const fetchBbpsBill = async () => {
    setLoading(true);
    try {
      const res = await fetchBill(mobile, cardLast4, code);
      console.log(res);
      if (res.statuscode === 'TXN') {
        setBill(res); // ✅ not res.data (your API already returns full object)
        toast.success(res.message);
      } else {
        toast.error(res?.message || 'Failed to fetch bill');
        setBill(null);
      }
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || 'Something went wrong');

      setBill(null);
    setLoading(false);

    }
    setLoading(false);

  };

  const reset = () => {
    setMobile('');
    setCardLast4('');
    setBill(null);
  };

  return (
    <Grid size={{ xs: 12, md: 5 }}>
      <Card sx={{ border: '2px dashed #d1d5db', borderRadius: 3 }}>
        <CardContent>
          <Typography fontWeight={700} mb={3}>
            Credit Card Payment
          </Typography>

          <Box display="flex" flexDirection="column" gap={3}>
            {/* Card Name */}
            <Box>
              <Typography fontSize={13} mb={0.5} color="text.secondary">
                Credit Card
              </Typography>
              <TextField
                fullWidth
                value={title}
                disabled
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000',
                    opacity: 1
                  },
                  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#000'
                  }
                }}
              />
            </Box>

            {/* Mobile */}
            <Box>
              <Typography fontSize={13} mb={0.5} color="text.secondary">
                Mobile Number
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                inputProps={{ maxLength: 10 }}
              />
            </Box>

            {/* Card Last 4 */}
            <Box>
              <Typography fontSize={13} mb={0.5} color="text.secondary">
                Card Last 4 Digits
              </Typography>
              <TextField
                fullWidth
                placeholder="XXXX"
                value={cardLast4}
                onChange={(e) => setCardLast4(e.target.value)}
                inputProps={{ maxLength: 4 }}
              />
            </Box>
            <Grid container spacing={2} mt={1}>
              <Grid size={{ xs: 6 }}>
                <Button fullWidth variant="outlined" onClick={reset}>
                  Clear
                </Button>
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Button fullWidth variant="contained" onClick={fetchBbpsBill}>
                  Fetch Bill
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default LeftSide;
