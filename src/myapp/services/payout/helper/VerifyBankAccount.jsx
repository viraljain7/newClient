import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { BlueButton, OutlineButton } from '../../../../components/CommonComponent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { bankAccountVerify, fetchUserPayoutDetails } from '../payoutApi';
import toast from 'react-hot-toast';

export default function Ver({ open, handleClose, userData, setPayoutUser, setLoading }) {
 
 const handleVerify = async () => {
  try {
    setLoading(true);

    const txnID = `T${userData?.user_id}${Date.now()}`;

    const res = await bankAccountVerify(userData.id, txnID);

    if (res?.statuscode === "TXN") {
      const fetchUser = await fetchUserPayoutDetails(userData.mobile);
      setPayoutUser(fetchUser?.data);

      toast.success(res?.message || "Verified successfully");
      handleClose && handleClose(); 
        } else {
      toast.error(res?.message || "Verification failed");
    }
  } catch (error) {
    console.error("Verify Error:", error);

    toast.error(
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false); 
  }
};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="verify-bank-title"
      aria-describedby="verify-bank-description"
      maxWidth="lg" // 👈 control width (xs, sm, md, lg)
      PaperProps={{
        sx: {
          width: '500px', // 👈 set exact width
          maxWidth: '90%' // responsive safety
        }
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '22px',
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        Verify Bank Account
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {/* Content */}
      <DialogContent>
        <Typography
          variant="h6"
          fontWeight={600} // 👈 makes text bold-ish
        >
          Are you sure you want to verify this account?
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 2, display: 'flex', gap: 2 }}>
        <OutlineButton label="Cancel" onClick={handleClose} sx={{ fontWeight: 600, flex: 1 }} />

        <BlueButton label="Verify" onClick={handleVerify} sx={{ fontWeight: 600, flex: 1 }} />
      </DialogActions>
    </Dialog>
  );
}
