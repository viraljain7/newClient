import React, { useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider, TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { payBbpsBill } from './bbpsApi';

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

const RightSide = ({ bill,setLoading,setBill }) => {
  const [amount, setAmount] = useState('');

  // 🔹 Helpers
  const formatAmount = (amount) => {
    if (!amount) return '-';
    return `₹ ${(Number(amount) / 100).toLocaleString('en-IN', {
      minimumFractionDigits: 2
    })}`;
  };



  const maxAmount = Number(bill?.billAmount) / 100 || 0;

  const payHandler = async () => {
    setLoading(true);
  try {
    const res = await payBbpsBill(bill, amount); 
    if (res?.statuscode === "TXN") {
      setBill(null);
      toast.success(res.message);

    } else {
      toast.error(res?.message || "Payment failed");
    }

  } catch (err) {
    console.error(err);

    toast.error(
      err?.response?.data?.message || "Payment error"
    );
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
            <Row label="Biller ID" value={bill?.biller_id} />
            <Row label="Mobile Number" value={bill?.mobile} />
            <Row label="Card Last 4 Digit" value={bill?.card_last_4_digit} />

            <Divider />

            {/* Dates */}
            <Row label="Bill Date" value={bill?.billDate} />
            <Row label="Due Date" value={bill?.billDueDate} color="error.main" />

            <Divider />

            {/* Amounts */}
            <Row label="Total Amount" value={formatAmount(bill?.billAmount)} highlight />


            <Divider />

            {/* 🔹 INPUT FIELD */}
            <Box>
              <Grid container spacing={2} alignItems="center">
                {/* 🔹 INPUT (75%) */}
                <Grid size={{ xs: 8 }}>
                  <TextField
                    fullWidth
                    placeholder="Enter amount"
                    value={amount}
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
                      if (!/^\d*$/.test(val)) return;
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
                  >
                    Pay
                  </Button>
                </Grid>
              </Grid>
              {/* 🔹 Validation */}
              <ErrorValidation amount={amount}  maxAmount={maxAmount} />
            </Box>

            <Divider />

            <Row label="Bill Fetched: " value="Successfully" color="success.main" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RightSide;

const ErrorValidation = ({ amount,  maxAmount }) => {
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
