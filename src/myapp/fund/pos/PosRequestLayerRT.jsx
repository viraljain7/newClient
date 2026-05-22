import * as React from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loaderSlice';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { posRequest } from './posAPI';
import PosResponseModal from './helper/PosResponseModal';

function PosRequestLayerRT() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);
  const [transactionData, setTransactionData] = React.useState(null);

  const [formData, setFormData] = React.useState({
    name: '',
    rrn: '',
    cardLast4: '',
    amount: '',
    slip: null
  });

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.rrn) {
      newErrors.rrn = 'RRN is required.';
    } else if (!/^\d{12}$/.test(formData.rrn)) {
      newErrors.rrn = 'RRN must be exactly 12 digits.';
    }
    if (!formData.cardLast4) {
      newErrors.cardLast4 = 'Required.';
    } else if (!/^\d{4}$/.test(formData.cardLast4)) {
      newErrors.cardLast4 = 'Must be 4 digits.';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required.';
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Enter a valid amount.';
    }
    if (!formData.slip) newErrors.slip = 'Please upload a payment slip.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(startLoading());

      const payload = {
        amount: formData.amount,
        rrn: formData.rrn,
        name: formData.name,
        card_last4: formData.cardLast4,
        pos_slip: formData.slip
      };

      const res = await posRequest(payload);

      if (res?.status === 'SUCCESS') {
        toast.success('Request submitted successfully!');
        setTransactionData({
          status: res.data.status, // 'pending' | 'success' | 'failed'
          amount: res.data.amount,
          txnid: res.data.txnid, // from API response
          apitxnid: res.data.apitxnid // from API response
        });
        setShowModal(true);

        setFormData({
          name: '',
          rrn: '',
          cardLast4: '',
          amount: '',
          slip: null
        });

        setErrors({});
      } else {
        toast.error(res?.message || 'Failed to submit request.');
      }
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      dispatch(stopLoading());
    }
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
          maxWidth: 1100,
          overflow: 'hidden',
          boxShadow: 6
        }}
      >
        <Grid container>
          {/* ── LEFT SIDE ── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src={'https://i.ibb.co/m5ZvKYwr/aq.png'} // replace with your QR src
              alt="Payment QR Code"
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                // fallback placeholder if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
          </Grid>

          {/* ── RIGHT SIDE ── */}
          <Grid size={{ xs: 12, md: 7 }}>
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 5 }
              }}
            >
              <Typography variant="h5" fontWeight={700} mb={0.5}>
                POS Load Request
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={3}>
                Fill all fields carefully. All information is verified.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  {/* Full Name */}
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    inputProps={{ autoComplete: 'name' }}
                  />

                  {/* RRN */}
                  <TextField
                    fullWidth
                    label="RRN Number (12 digits)"
                    name="rrn"
                    value={formData.rrn}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setFormData((prev) => ({ ...prev, rrn: val }));
                      setErrors((prev) => ({ ...prev, rrn: undefined }));
                    }}
                    error={!!errors.rrn}
                    helperText={errors.rrn || `${formData.rrn.length}/12 digits`}
                    inputProps={{ inputMode: 'numeric', maxLength: 12 }}
                  />

                  {/* Card Last 4 + Amount */}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <TextField
                        fullWidth
                        label="Card Last 4 Digits"
                        name="cardLast4"
                        value={formData.cardLast4}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setFormData((prev) => ({ ...prev, cardLast4: val }));
                          setErrors((prev) => ({ ...prev, cardLast4: undefined }));
                        }}
                        error={!!errors.cardLast4}
                        helperText={errors.cardLast4}
                        inputProps={{ inputMode: 'numeric', maxLength: 4, placeholder: '•••• XXXX' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 7 }}>
                      <TextField
                        fullWidth
                        label="Amount (₹)"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        error={!!errors.amount}
                        helperText={errors.amount}
                        inputProps={{ min: 1 }}
                      />
                    </Grid>
                  </Grid>

                  {/* File Upload */}
                  <Box>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      color={errors.slip ? 'error' : formData.slip ? 'success' : 'primary'}
                      sx={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        borderStyle: 'dashed',
                        textTransform: 'none',
                        fontWeight: 500
                      }}
                    >
                      {formData.slip ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                          {formData.slip.name}
                        </Box>
                      ) : (
                        'Upload Payment Slip'
                      )}
                      <input hidden type="file" name="slip" accept="image/*" onChange={handleChange} />
                    </Button>
                    {errors.slip && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block', pl: 1.5 }}>
                        {errors.slip}
                      </Typography>
                    )}
                  </Box>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.95rem'
                    }}
                  >
                    Submit Request
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <PosResponseModal showModal={showModal} setShowModal={setShowModal} transactionData={transactionData} />
    </Box>
  );
}

export default PosRequestLayerRT;
