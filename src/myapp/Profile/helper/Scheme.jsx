import React, { useEffect, useState } from 'react';

import { Button, Grid, MenuItem } from '@mui/material';

import { CustomInput, TabPanel } from '../UserProfile';
import toast from 'react-hot-toast';

function Scheme({ tab, userDetails, getUserSchemes, handleUpdateScheme }) {
  const [schemes, setSchemes] = useState([]);

  const [selectedScheme, setSelectedScheme] = useState('');

  useEffect(() => {
    loadSchemes();
  }, []);

  useEffect(() => {
    if (userDetails?.scheme_id) {
      setSelectedScheme(userDetails.scheme_id);
    }
  }, [userDetails]);

  const loadSchemes = async () => {
    try {
      const res = await getUserSchemes();

      setSchemes(res?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const updateRes = await handleUpdateScheme({
        user_id: userDetails?.id,
        scheme_id: selectedScheme
      });

      toast.success(updateRes?.message || '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TabPanel value={tab} index={1}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput select label="Select Scheme" value={selectedScheme} onChange={(e) => setSelectedScheme(e.target.value)}>
            {schemes?.map((scheme) => (
              <MenuItem key={scheme?.id} value={scheme?.id}>
                {scheme?.name}
              </MenuItem>
            ))}
          </CustomInput>
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
            Save Scheme
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default Scheme;
