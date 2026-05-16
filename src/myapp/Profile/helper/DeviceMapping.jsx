import { useEffect, useState } from 'react';

import { Button, Grid } from '@mui/material';

import { CustomInput, TabPanel } from '../UserProfile';
import toast from 'react-hot-toast';

function DeviceMapping({ tab, userDetails, handleUpdateMid }) {
  const [mid, setMid] = useState('');

  useEffect(() => {
    if (userDetails?.pos_mid) {
      setMid(userDetails?.pos_mid);
    }
  }, [userDetails]);

  const handleSubmit = async () => {
    try {
      if (!mid) {
        toast.error('Device ID is required');
        return;
      }

  const res=    await handleUpdateMid({
        user_id: userDetails?.id,
        mid
      });

      toast.success(res?.message || 'Device mapped successfully');
    } catch (error) {
        toast.error(error?.message || 'Something went wrong');

      console.log(error);
    }
  };

  return (
    <TabPanel value={tab} index={6}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="Device Mapping" placeholder="Enter Device ID" value={mid} onChange={(e) => setMid(e.target.value)} />
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
            Map Device
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default DeviceMapping;
