import React from 'react'
import { Button,  Grid, MenuItem, } from '@mui/material';
import { CustomInput, TabPanel } from '../UserProfile';

function Scheme({tab}) {
  return (
        <TabPanel value={tab} index={1}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput select label="Select Scheme" defaultValue="">
                <MenuItem value="gold">Gold Scheme</MenuItem>
                <MenuItem value="silver">Silver Scheme</MenuItem>
                <MenuItem value="retailer">Retailer Scheme</MenuItem>
              </CustomInput>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
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
  )
}

export default Scheme
