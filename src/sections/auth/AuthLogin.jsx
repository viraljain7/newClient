import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from "react-router-dom";

import {
  Button,
  Stack,
  Typography,
  FormHelperText,
  Grid,
  Checkbox,
  FormControlLabel,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Box
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';

import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { loginUser } from './helper/api';
import toast from 'react-hot-toast';

// ==============================
// 🔹 API
// ==============================

// ==============================
// 🔹 OTP MODAL
// ==============================
function OTPDialog({ open, onClose, loginPayload }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);
const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join('');

    try {
      const res = await loginUser({
        ...loginPayload,
        via: 'otp',
        value: finalOtp
      });

      if (res.statuscode === 200) {
        localStorage.setItem('app-token', res.token);
        onClose();

navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Verify OTP</DialogTitle>

      <DialogContent>
        <Typography variant="body2" textAlign="center" mb={2}>
          Enter OTP sent to <b>{loginPayload?.mobile}</b>
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center">
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={digit}
              placeholder="•"
              onChange={(e) => handleChange(e.target.value, index)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: '20px',
                  width: '42px'
                }
              }}
            />
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Verify OTP
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ==============================
// 🔹 MAIN LOGIN
// ==============================
const AuthLogin = () => {
  const [otpOpen, setOtpOpen] = useState(false);
  const [loginPayload, setLoginPayload] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        mobile: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object({
        mobile: Yup.string()
          .matches(/^[0-9]{10}$/, 'Enter valid mobile number')
          .required('Mobile is required'),
        password: Yup.string().required('Password is required')
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const res = await loginUser({
            ...values,
            via: 'otp'
          });

          if (res.statuscode === 1300) {
            toast.success(res.message);

            setLoginPayload(values);
            setOtpOpen(true);
            return;
          }

          if (res.statuscode === 200) {
            toast.success(res.message);

            localStorage.setItem('app-token', res.token);
            navigate("/");

          }

          if (res.statuscode === 401) {
            toast.error(res.message);
          }
        } catch (err) {
          setErrors({
            submit: err?.response?.data?.message || 'Login failed'
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* MOBILE */}
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Mobile Number</InputLabel>
                <OutlinedInput
                  fullWidth
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                />
              </Stack>

              {formik.touched.mobile && formik.errors.mobile && <FormHelperText error>{formik.errors.mobile}</FormHelperText>}
            </Grid>

            {/* PASSWORD */}
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Password</InputLabel>

                <OutlinedInput
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Stack>

              {formik.touched.password && formik.errors.password && <FormHelperText error>{formik.errors.password}</FormHelperText>}
            </Grid>

            {/* OPTIONS */}
            <Grid size={12}>
              <Stack direction="row" justifyContent="space-between">
                <FormControlLabel control={<Checkbox />} label="Keep me signed in" />
                <Link component={RouterLink} to="#">
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>

            {/* ERROR */}
            {formik.errors.submit && (
              <Grid size={12}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Grid>
            )}

            {/* BUTTON */}
            <Grid size={12}>
              <AnimateButton>
                <Button fullWidth variant="contained" type="submit" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>

          {/* OTP MODAL */}
          <OTPDialog open={otpOpen} onClose={() => setOtpOpen(false)} loginPayload={loginPayload} />
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
