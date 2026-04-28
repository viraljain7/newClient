import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../../../../shared/BaseApi';

function Pg6() {
  const [amount, setAmount] = useState('');
  const [finalAmount, setFinalAmount] = useState(null);

  const user=useSelector(state=>state.user.profile)
  const quickAmounts = [5, 7, 12, 15, 19];

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!amount) return toast.error("Enter amount");
  if (finalAmount === null) return toast.error("Select a slab");

  if (finalAmount < 100) {
    toast.error("Amount must be greater than 100");
    return;
  }



  const newTxnId = `T${user?.id}${Date.now()}`;
  const surlWithParams = `${window.location.origin}/invoice/${newTxnId}`;

  try {
      const amountDecimal = parseFloat(finalAmount.toFixed(2));

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("mobile", user.mobile);
      formData.append("email", user.email);
      formData.append("amount", amountDecimal); // sends numeric decimal
      formData.append("redirect_url", surlWithParams);
      formData.append("txnid", newTxnId);

    const res = await api.post("/service/payin/pg10", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = res.data;

    if (data?.statuscode === "TXN") {
      toast.success(data.message || "Payment initiated");
          window.location.href = data.redirect_url;
    } else {
      toast.error(data?.message || "Payment failed");
    }
  } catch (error) {
    console.error("Payment error:", error?.response || error.message);
    toast.error("Something went wrong");
  } finally {
  }
};

  const numericAmount = Number(amount) || 0;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        sx={{
          width: 450,
          borderRadius: 3,
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Title */}
          <Typography variant="h5" fontWeight={700} textAlign="center">
            Diamond 2
          </Typography>

          {/* Amount Field */}
          <Box>
            <Typography variant="body2" fontWeight={600} mb={0.5}>
              Amount
            </Typography>
            <TextField
              placeholder="Enter amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setFinalAmount(null); // reset on change
              }}
            />
          </Box>

          {/* Quick Deduction Buttons */}
          {numericAmount > 0 && (
            <>
              <Typography variant="body2" fontWeight={600}>
                Select one amount
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {quickAmounts.map((amt) => {
                  const calculated = numericAmount - amt;

                  return (
                    <Button
                      key={amt}
                      variant={finalAmount === calculated ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => setFinalAmount(calculated)}
                      disabled={calculated <= 0}
                    >
                      ₹{calculated}
                    </Button>
                  );
                })}
              </Box>
            </>
          )}

          {/* Final Amount Preview */}
          {finalAmount !== null && (
            <Typography textAlign="center" fontWeight={600}>
              Final Payable: ₹{finalAmount}
            </Typography>
          )}

          {/* Submit */}
          <Button
            variant="contained"
            fullWidth
            disabled={!finalAmount}
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2
            }}
            onClick={handleSubmit}
          >
            {finalAmount ? `Pay ₹${finalAmount}` : 'Enter amount'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Pg6;
