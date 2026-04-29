import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import LeftSide from '../../myapp/services/bbps/LeftSide';
import RightSide from '../../myapp/services/bbps/RightSide';
import { useState } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";

function FetchBbpsBill() {
  let [bill, setBill] = useState(null);

  let [loading,setLoading]=useState(false);

  const cardDetails = useSelector((state) => state.bbps.bbps);

  return (
    <Box>
        <Backdrop
    open={loading}
    sx={{
      color: "#fff",
      zIndex: (theme) => theme.zIndex.modal + 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
      <Grid container spacing={3}>
        <LeftSide cardDetails={cardDetails} setBill={setBill} setLoading={setLoading} />
        {bill && <RightSide bill={bill} setBill={setBill} setLoading={setLoading}/>}
      </Grid>
    </Box>
  );
}

export default FetchBbpsBill;
