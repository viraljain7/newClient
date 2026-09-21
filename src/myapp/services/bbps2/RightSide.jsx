import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider, TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { payBbpsBill } from './bbpsApi';
import { useSelector } from 'react-redux';

// 🔹 Row Component
const Row = ({ label, value, highlight, color }) => (
  <Box display="flex" justifyContent="space-between" py={0.5}>
    <Typography color="text.secondary" fontSize={14}>
      {label}
    </Typography>
    <Typography fontWeight={highlight ? 700 : 500} color={color || 'text.primary'}>
      {value}
    </Typography>
  </Box>
);

const RightSide = ({ bill, setLoading, setBill }) => {
  const [amount, setAmount] = useState('');
  const [panCard, setPanCard] = useState('');
  const userdata = useSelector((state) => state.user.profile.pancard);

  useEffect(() => {
    if (userdata) {
      setPanCard(userdata);
    }
  }, []);

  // 🔹 Helpers
  const formatAmount = (amount) => {
    if (!amount) return '-';
    return `₹ ${Number(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2
    })}`;
  };

  const maxAmount = Number(bill?.billAmount) || 0;

  const payHandler = async () => {
    setLoading(true);
    try {
      if (amount > 49999) {
        toast.error('Amount should be less than ₹50000');
        setLoading(false);
        return;
      }
      const res = await payBbpsBill(bill, amount, panCard);
      if (res?.statuscode === 'TXN') {
        setBill(null);
        toast.success(res.message);
      } else {
        toast.error(res?.message || 'Payment failed');
      }
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || 'Payment error');
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Grid size={{ xs: 12, md: 7 }}>
      <Card
        sx={{
          border: '2px dashed #d1d5db',
          borderRadius: 3,
          height: '100%'
        }}
      >
        <CardContent>
          <Typography fontWeight={700} mb={3}>
            Credit Card Details
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            {/* Info */}
            <Row label="Customer Name" value={bill?.customerName} />
            <Row label="Mobile Number" value={bill?.mobile} />
            <Row label="Card Last 4 Digit" value={bill?.card} />

            <Divider />

            {/* Dates */}
            <Row label="Bill Date" value={bill?.billDate} />
            <Row label="Due Date" value={bill?.billDueDate} color="error.main" />

            <Divider />

            {/* Amounts */}
            <Row label="Total Amount" value={formatAmount(bill?.billAmount)} highlight />

            <Divider />

            <Box>
              <Typography
                component="label"
                sx={{
                  display: 'block',
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151'
                }}
              >
                PAN Card <span style={{ color: '#d21919' }}>*</span>
              </Typography>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  placeholder="Enter PAN CARD NUMBER"
                  value={panCard}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: '2px solid #d1d5db'
                      },
                      '&:hover fieldset': {
                        borderColor: '#d21919ff'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#d21919ff',

                        borderWidth: '2px'
                      }
                    }
                  }}
                  onChange={(e) => {
                    const val = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, '')
                      .slice(0, 10);

                    setPanCard(val);
                  }}
                  inputProps={{
                    maxLength: 10
                  }}
                />
              </Grid>

              {/* 🔹 BUTTON (25%) */}
            </Box>

            {/* 🔹 INPUT FIELD */}
            <Box>
              <Grid container spacing={2} alignItems="center">
                {/* 🔹 INPUT (75%) */}
                <Grid size={{ xs: 8 }}>
                  <TextField
                    fullWidth
                    placeholder="Enter amount"
                    value={amount}
                    disabled={panCard.length !== 10}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '2px solid #d1d5db'
                        },
                        '&:hover fieldset': {
                          borderColor: '#1976d2'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                          borderWidth: '2px'
                        }
                      }
                    }}
                    onChange={(e) => {
                      const val = e.target.value;

                      if (!/^\d*\.?\d{0,2}$/.test(val)) return;

                      setAmount(val);
                    }}
                  />
                </Grid>

                {/* 🔹 BUTTON (25%) */}
                <Grid size={{ xs: 4 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ height: '38px' }} // match TextField height
                    onClick={payHandler}
                    disabled={panCard.length !== 10}
                  >
                    Pay
                  </Button>
                </Grid>
              </Grid>
              {/* 🔹 Validation */}
              <ErrorValidation amount={amount} maxAmount={maxAmount} />
            </Box>

            <Divider />
            <Row
              label="Note:"
              value={<span style={{ fontWeight: 700 }}>[ Transaction Limit ] | All Banks: Max ₹49,999</span>}
              color="error.main"
            />
            <Row label="Bill Fetched: " value="Successfully" color="success.main" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RightSide;

const ErrorValidation = ({ amount, maxAmount }) => {
  return (
    <>
      {amount && Number(amount) > maxAmount && (
        <Typography fontSize={12} color="error.main" mt={0.5}>
          Amount should be ≤ ₹{maxAmount}
        </Typography>
      )}
    </>
  );
};
