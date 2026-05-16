import { Button,  Grid,MenuItem } from '@mui/material';
import {  CustomInput, TabPanel } from '../UserProfile';

function ParentMapping({tab}) {
  return (
        <TabPanel value={tab} index={5}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomInput select label="Select Parent" defaultValue="">
                <MenuItem value="master">Master Distributor</MenuItem>
                <MenuItem value="distributor">Distributor</MenuItem>
                <MenuItem value="super">Super Distributor</MenuItem>
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
                Save Mapping
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

  )
}

export default ParentMapping
