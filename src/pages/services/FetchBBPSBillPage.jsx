import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import LeftSide from '../../myapp/services/bbps/LeftSide';
import RightSide from '../../myapp/services/bbps/RightSide';
import { useState } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";

function FetchBbpsBill() {
  let [bill, setBill] = useState(null);

  let [loading,setLoading]=useState(false);
  // 🔹 Dummy API Response
  // const bill = {
  //   statuscode: 'TXN',
  //   message: 'Bill fetched successfully',
  //   enquiryReferenceId: 'XYZ123ABC456DEF789',

  //   customerName: 'Viral Jain',
  //   mobile: '8128157846',
  //   card_last_4_digit: '0071',
  //   biller_id: 'SBIC00000NATDN',

  //   billAmount: '4171416',
  //   billDate: '2026-04-22',
  //   billDueDate: '2026-05-12',

  //   requested_amount: '10000',

  //   additionalInfo: {
  //     info: [
  //       { infoName: 'Minimum Amount Due', infoValue: '2641.28' },
  //       { infoName: 'Maximum Permissible Amount', infoValue: '43799.86' }
  //     ]
  //   }
  // };

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
