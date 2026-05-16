import React from 'react'
import { Button,  Grid,MenuItem } from '@mui/material';
import { CustomInput, TabPanel } from '../UserProfile';

function WalletLock({tab}) {
  return (
        <TabPanel value={tab} index={4}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput label="Amount" placeholder="Enter Amount" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput select label="Lock Action" defaultValue="">
                <MenuItem value="lock">Lock</MenuItem>
                <MenuItem value="unlock">Unlock</MenuItem>
              </CustomInput>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                color="error"
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
  )
}

export default WalletLock
