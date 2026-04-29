import { Card, CardContent, Drawer, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BlueButton } from '../../../../components/CommonComponent';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { mobileNumberKyc } from '../payoutApi';
import toast from 'react-hot-toast';

function KycVerify({ openDrawer, onClose, mobile, onSubmit, setLoading }) {
  const [form, setForm] = useState({
    mobile: '',
    name: '',
    dob: '',
    city: '',
    aadhar: ''
  });

  useEffect(() => {
    if (mobile) {
      setForm((p) => ({
        ...p,
        mobile
      }));
    }
  }, [mobile]);

  const verifyHandler = async () => {
    setLoading(true);

    const { name, dob, city, aadhar } = form;

    if (mobile.length !== 10) {
      toast.error('Enter valid mobile number');
      setLoading(false);

      return;
    }

    const res = await mobileNumberKyc(mobile, name, dob, city, aadhar);

    if (res.statuscode === 'TXN') {
      toast.success(res.message);
      onClose && onClose();
      onSubmit && onSubmit();
      setForm({
        name: '',
        dob: '',
        city: '',
        aadhar: ''
      });
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={onClose}>
      <Box
        sx={{
          width: 380,
          height: '100%'
        }}
      >
        <Card
          sx={{
            height: '100%'
          }}
        >
          <CardContent>
            <Box position="relative" mb={4}>
              {/* Center Title */}
              <Typography fontWeight={700}>KYC Verification</Typography>

              {/* Right Close Button */}
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
              {/* Mobile */}
              <TextField label="Mobile Number" value={form.mobile} disabled />

              {/* Name */}
              <TextField label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

              {/* DOB */}
              <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />

              {/* City */}
              <TextField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />

              {/* Aadhar */}
              <TextField
                label="Aadhar Number (Optional)"
                value={form.aadhar}
                inputProps={{ maxLength: 12 }}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!/^\d*$/.test(val)) return;
                  setForm({ ...form, aadhar: val });
                }}
              />

              <BlueButton label="Verify" onClick={verifyHandler} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default KycVerify;
