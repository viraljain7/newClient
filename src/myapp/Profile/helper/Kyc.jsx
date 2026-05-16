import {  CustomInput, TabPanel } from '../UserProfile';
import { Button,  Grid,MenuItem } from '@mui/material';

function Kyc({tab}) {
  return (
        <TabPanel value={tab} index={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput select label="KYC Select Option" defaultValue="">
                <MenuItem value="individual">Individual</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </CustomInput>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                fullWidth
                component="label"
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Shop Image
                <input hidden type="file" />
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                fullWidth
                component="label"
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Shop Video
                <input hidden type="file" />
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                fullWidth
                component="label"
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Merchant Selfie
                <input hidden type="file" />
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Submit KYC
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
  )
}

export default Kyc
