import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Grid, Backdrop, CircularProgress } from '@mui/material';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { offlineBillPayment } from './api';
import toast from 'react-hot-toast';

function OfflineCreditCard() {
const [loading,setLoading]=useState(false)

  const [cardData, setCardData] = useState({
    cvc: '',
    expiry: '',
    focus: ''
  });

  const [formData, setFormData] = useState({
    title: '',
    mobile: '',
    cardNumber: '',
    amount: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile') {
      setFormData((prev) => ({
        ...prev,
        mobile: value.replace(/\D/g, '').slice(0, 10)
      }));
    } else if (name === 'cardNumber') {
      const cleanValue = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');

      setFormData((prev) => ({
        ...prev,
        cardNumber: formatted
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFocus = (e) => {
    setCardData((prev) => ({
      ...prev,
      focus: e.target.name
    }));
  };

  const handleBlur = () => {
    setCardData((prev) => ({
      ...prev,
      focus: ''
    }));
  };

  const reset = () => {
    setCardData({
      cvc: '',
      expiry: '',
      focus: ''
    });

    setFormData({
      title: '',
      mobile: '',
      cardNumber: '',
      amount: ''
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { mobile, cardNumber, amount, title } = formData;
      if(!mobile||!cardNumber||!amount||!title){
        toast.error('All fields are required!');
        return;
      }

      const res = await offlineBillPayment(
        mobile,
        cardNumber.replace(/\s/g, ''), // remove spaces
        amount,
        title
      );


    

      if (res.statuscode === 'TXN') {
        toast.success(res.message || 'Payment successful!');

        reset();
      } else {
        toast.error(res.message || 'Payment Failed!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong');
    }finally{
      setLoading(false);

    }
  };

  return (
    <Box>

        <Backdrop
              open={loading}
              sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.modal + 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
      <Grid container spacing={4}>
        {/* LEFT SIDE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              border: '2px dashed #d1d5db',
              borderRadius: 3,
              background: '#fff',
              minHeight: 350,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Cards
              cvc={cardData.cvc}
              expiry={cardData.expiry}
              focused={cardData.focus}
              name={formData.title}
              number={formData.cardNumber}
            />
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ border: '2px dashed #d1d5db', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Credit Card Details
              </Typography>

              <Box display="flex" flexDirection="column" gap={3}>
                {/* Card Holder Name */}
                <Box>
                  <Typography fontSize={13} mb={0.5} color="text.secondary">
                    Card Holder Name
                  </Typography>

                  <TextField
                    fullWidth
                    name="title"
                    placeholder="Enter Card Holder Name"
                    value={formData.title}
                    onChange={handleFormChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Box>

                {/* Amount */}
                <Box>
                  <Typography fontSize={13} mb={0.5} color="text.secondary">
                    Amount
                  </Typography>

                  <TextField
                    fullWidth
                    name="amount"
                    type="number"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                  />
                </Box>

                {/* Mobile */}
                <Box>
                  <Typography fontSize={13} mb={0.5} color="text.secondary">
                    Mobile Number
                  </Typography>

                  <TextField
                    fullWidth
                    name="mobile"
                    placeholder="Enter 10-digit Mobile Number"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    inputProps={{ maxLength: 10 }}
                  />
                </Box>

                {/* Card Number */}
                <Box>
                  <Typography fontSize={13} mb={0.5} color="text.secondary">
                    Credit Card Number
                  </Typography>

                  <TextField
                    fullWidth
                    name="number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleFormChange({
                        target: {
                          name: 'cardNumber',
                          value: e.target.value
                        }
                      })
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    inputProps={{ maxLength: 19 }}
                  />
                </Box>

                {/* Buttons */}
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Button fullWidth variant="outlined" onClick={reset}>
                      Clear
                    </Button>
                  </Grid>

                  <Grid size={6}>
                    <Button fullWidth variant="contained" onClick={handlePayment}>
                      Payment
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OfflineCreditCard;
