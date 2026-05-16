import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { CustomInput, TabPanel } from '../UserProfile';

import { BlueButton } from '../../../components/CommonComponent';
import toast from 'react-hot-toast';

function UserInfo({
  tab,
  userDetails,
  onUpdateProfile,
  refetchUserDetails,
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    address: '',
    shop_name: '',
    pan_number: '',
    aadhaar_number: '',
  });

  useEffect(() => {
    if (userDetails) {
      setForm({
        name: userDetails?.name || '',
        email: userDetails?.email || '',
        mobile: userDetails?.mobile || '',
        dob: userDetails?.dob || '',
        address: userDetails?.address || '',
        shopname: userDetails?.shopname || '',
        pancard: userDetails?.pancard || '',
        aadharcard: userDetails?.aadharcard || '',
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
  const updateRes=  await onUpdateProfile({
      user_id: userDetails?.id,
      ...form,
    });

    toast.success(updateRes?.message || '');

    await refetchUserDetails({
      user_id: userDetails?.id,
    });
  };

  return (
    <TabPanel value={tab} index={0}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            label="Full Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            label="Email *"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            label="Phone *"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            label="DOB"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomInput
            label="Address"
            name="address"
            multiline
            rows={3}
            value={form.address}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            label="Shop Name"
            name="shopname"
            value={form.shopname}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            label="PAN Number"
            name="pancard"
            value={form.pancard}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomInput
            label="Aadhaar Number"
            name="aadharcard"
            value={form.aadharcard}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <BlueButton
            label="Save Profile"
            sx={{ width: 'auto' }}
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default UserInfo;