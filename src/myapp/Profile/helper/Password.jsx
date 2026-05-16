import { Button,  Grid, } from '@mui/material';
import {  CustomInput, TabPanel } from '../UserProfile';

function Password({tab}) {
  return (
        <TabPanel value={tab} index={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput type="password" label="Old Password" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput type="password" label="New Password" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput type="password" label="Confirm Password" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
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
  )
}

export default Password