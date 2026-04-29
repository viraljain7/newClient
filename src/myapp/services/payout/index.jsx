import { Backdrop, CircularProgress, Grid } from '@mui/material';

import BeniListTable from './helper/BeniListTable';
import PayoutMobile from './helper/PayoutMobile';
import UserDetails from './helper/UserDetails';
import { useState } from 'react';

function Payout() {
  const [payoutUser, setPayoutUser] = useState(null);
  const [loading, setLoading] = useState(false);
 

  return (
    <>
      <Backdrop
        open={loading}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.modal + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={3} mb={3}>
        {/* payout: mobile no  */}
        <PayoutMobile setPayoutUser={setPayoutUser} setLoading={setLoading}/>

        {/* user details */}
        {payoutUser && payoutUser.length > 0 && <UserDetails payoutUser={payoutUser[0]}  />}

        {/* do user kyc   */}
      </Grid>

      {/* payout bene list */}
      {payoutUser && payoutUser.length > 0 && <BeniListTable payoutUser={payoutUser} setPayoutUser={setPayoutUser} setLoading={setLoading}/>}
    </>
  );
}

export default Payout;
