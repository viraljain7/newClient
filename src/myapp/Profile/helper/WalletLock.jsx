import { useState } from 'react';

import { Button, Grid, MenuItem } from '@mui/material';

import { CustomInput, TabPanel } from '../UserProfile';
import toast from 'react-hot-toast';

function WalletLock({ tab, userDetails, handleUpdateWallet }) {
  const [form, setForm] = useState({
    amount: '',
    type: 'lock'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.amount) {
        return toast.error('Amount is required');
      }

      if (!form.type) {
        return toast.error('Please select action');
      }

      const res = await handleUpdateWallet({
        user_id: userDetails?.id,
        amount: form.amount,
        type: form.type
      });

      toast.success(res?.message || `Wallet ${form.type} successful`);

      setForm({
        amount: '',
        type: ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TabPanel value={tab} index={4}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="Amount" placeholder="Enter Amount" name="amount" value={form.amount} onChange={handleChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput select label="Lock Action" name="type" value={form.type} onChange={handleChange}>
            <MenuItem value="lock">Lock</MenuItem>

            <MenuItem value="unlock">Unlock</MenuItem>
          </CustomInput>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            variant="contained"
            color={form.type === 'unlock' ? 'success' : 'error'}
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Submit Action
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default WalletLock;
