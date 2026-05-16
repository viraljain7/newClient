import {   Grid, } from '@mui/material';
import { CustomInput, TabPanel } from '../UserProfile';
import { BlueButton } from '../../../components/CommonComponent';

function UserInfo({tab}) {
  return (
    <TabPanel value={tab} index={0}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="Full Name *" defaultValue="Vishal Desai" />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="Email *" defaultValue="vishal.a.desai2010@gmail.com" />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="Phone *" defaultValue="9512870200" />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="DOB" defaultValue="01/04/1985" />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomInput
            label="Address"
            multiline
            rows={3}
            defaultValue="C-502 VANDE RESIDENCY, NEAR RATANLALPARK, AJWA WAGHODIA RING ROAD, Ajwa Road, Vadodara, Gujarat, India, 390019"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="Shop Name" defaultValue="Sagar Beverages" />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput label="PAN Number" placeholder="Enter PAN Number" />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomInput label="Aadhaar Number" />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <BlueButton label="Save Scheme" sx={{ width: 'auto' }} />
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default UserInfo;
