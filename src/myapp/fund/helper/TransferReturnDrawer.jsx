import {
  Drawer,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

function TransferReturnDrawer({ open, onClose, data }) {
    console.log(data)
  const [form, setForm] = useState({
    username: '',
    mobile: '',
    parentName: '',
    parentMobile: '',
    balance: '',
    type: '',
    amount: ''
  });

useEffect(() => {
  if (data) {
    setForm((p) => ({
      ...p,
      username: data?.name || '',
      mobile: data?.mobile || '',
      parentName: data?.parent?.name || '',
      parentMobile: data?.parent?.mobile || '',
      balance:data.mainbalance
    }));
  }
}, [data]);
//   console.log(data)


  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", form,data.id);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, height: '100%' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>

            {/* Header */}
            <Box position="relative" mb={3}>
              <Typography fontWeight={700} fontSize={18}>
                Transfer / Return
              </Typography>

              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Form */}
            <Box display="flex" flexDirection="column" gap={2}>

              <TextField
                label="Username"
                value={form.username}
            
              />

              <TextField
                label="Mobile Number"
                inputProps={{ maxLength: 10 }}
                value={form.mobile}
            
              />

              <TextField
                label="Parent Name"
                value={form.parentName}
                
              />

              <TextField
                label="Parent Mobile"
                inputProps={{ maxLength: 10 }}
                value={form.parentMobile}
            
              />

              <TextField
                label="Main Balance"
                value={form.balance}
                
              />

              <TextField
                select
                label="Type"
                value={form.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <MenuItem value="transfer">Transfer</MenuItem>
                <MenuItem value="return">Return</MenuItem>
              </TextField>

              <TextField
                label="Amount"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />

              {/* Actions */}
              <Box display="flex" gap={2} mt={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={onClose}
                >
                  Close
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>

            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default TransferReturnDrawer;