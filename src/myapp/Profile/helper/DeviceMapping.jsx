import { Button,  Grid, } from '@mui/material';
import {  CustomInput, TabPanel } from '../UserProfile';

function DeviceMapping({tab}) {
  return (
        <TabPanel value={tab} index={6}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput label="Device Mapping" placeholder="Enter Device ID" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
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
  )
}

export default DeviceMapping
