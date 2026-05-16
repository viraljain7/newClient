import * as React from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function RupayUpiLoadRequest() {
  const [formData, setFormData] = React.useState({
    mobile: '',
    name: '',
    amount: '',
    txnId: '',
    slip: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 1200,
          overflow: 'hidden',
          boxShadow: 6
        }}
      >
        <Grid container>
          {/* LEFT SIDE */}

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: '100%',
                minHeight: { xs: 300, md: 650 },
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                component="img"
                src={import.meta.env.VITE_IMG_URL + 'payments/QRRuPayUPI.png?v=' + new Date().getTime()}
                alt="Payment"
                sx={{
                  width: '70%',
                  height: '70%'
                }}
              />
            </Box>
          </Grid>

          {/* RIGHT SIDE */}

          <Grid size={{ xs: 12, md: 6 }}>
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h4" fontWeight={700} mb={1}>
                Rupay UPI Load Wallet Request
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={4}>
                Fill all required information carefully.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    inputProps={{
                      maxLength: 10,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                  />

                  <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} />

                  <TextField fullWidth label="Amount" name="amount" type="number" value={formData.amount} onChange={handleChange} />

                  <TextField fullWidth label="Transaction ID" name="txnId" value={formData.txnId} onChange={handleChange} />

                  <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                    Upload Payment Slip
                    <input hidden type="file" name="slip" accept="image/*" onChange={handleChange} />
                  </Button>

                  {formData.slip && (
                    <Typography variant="body2" color="text.secondary">
                      Selected: {formData.slip.name}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      textTransform: 'none',
                      //   fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
