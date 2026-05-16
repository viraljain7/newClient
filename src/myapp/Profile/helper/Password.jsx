import { useState } from 'react';

import { Button, Grid } from '@mui/material';

import { CustomInput, TabPanel } from '../UserProfile';
import toast from 'react-hot-toast';

function Password({ tab, userDetails, handleUpdatePassword }) {
  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
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
      if (!form.old_password) {
        return toast.error('Old password is required');
      }

      if (!form.new_password) {
        return toast.error('New password is required');
      }

      if (form.new_password !== form.confirm_password) {
        return toast.error('Passwords do not match');
      }

const res=        await handleUpdatePassword({
        user_id: userDetails?.id,
        old_password: form.old_password,
        new_password: form.new_password
      });

      toast.success(res?.message || 'Password updated successfully');

      setForm({
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TabPanel value={tab} index={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput type="password" label="Old Password" name="old_password" value={form.old_password} onChange={handleChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput type="password" label="New Password" name="new_password" value={form.new_password} onChange={handleChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            type="password"
            label="Confirm Password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Update Password
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default Password;
