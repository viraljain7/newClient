import { Drawer, Box, Card, CardContent, Typography, IconButton, TextField, MenuItem, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BlueButton } from '../../../../components/CommonComponent';
import { addBankAccount, fetchBanks, fetchUserPayoutDetails } from '../payoutApi';

function AddBankDrawer({ open, onClose, payoutUser, setLoading, setPayoutUser }) {
  const [form, setForm] = useState({
    bank: '',
    ifsc: '',
    account: '',
    name: ''
  });

  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    const getBanks = async () => {
      try {
        if (bankList.length === 0) {
          const res = await fetchBanks();
          setBankList(res?.data || []);
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load banks');
      }
    };

    getBanks();
  }, []);

  const handleAddBankAccount = async () => {
    try {
      setLoading(true);

      const { bank: bankName, ifsc, account, name: userName } = form;
      const mobile = payoutUser?.[0]?.mobile;

      // ✅ Validation
      if (!ifsc || !account || !bankName || !userName || !mobile) {
        toast.error('All fields are required');
        return;
      }

      // ✅ API Call
      const res = await addBankAccount(bankName, account, ifsc, userName, mobile);

      if (res?.statuscode === 'TXN') {
        toast.success(res?.message || 'Bank added successfully');

        // ✅ Refresh user data
        const fetchUser = await fetchUserPayoutDetails(mobile);
        setPayoutUser(fetchUser?.data);

        // ✅ Reset form
        setForm({
          bank: '',
          ifsc: '',
          account: '',
          name: ''
        });

        onClose && onClose(); // close only on success
      } else {
        toast.error(res?.message || 'Failed to add bank account');
      }
    } catch (error) {
      console.error('Add Bank Error:', error);

      toast.error(error?.response?.data?.message || error?.message || 'Something went wrong');
    } finally {
      setLoading(false); // ✅ always runs
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, height: '100%' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            {/* 🔹 Header */}
            <Box position="relative" mb={4}>
              <Typography fontWeight={700}>Add Bank Account</Typography>

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

            {/* 🔹 Form */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Autocomplete
                options={bankList}
                getOptionLabel={(option) => option.name || ''}
                value={bankList.find((b) => b.name === form.bank) || null}
                onChange={(e, val) => {
                  setForm({ ...form, bank: val.name, ifsc: val.ifsc });
                  console.log({ ...form, bank: val.name, ifsc: val.ifsc });
                }}
                renderInput={(params) => <TextField {...params} label="Select Bank" />}
              />
              {/* </TextField> */}

              {/* IFSC */}
              <TextField
                label="IFSC Code"
                value={form.ifsc}
                disabled
                onChange={(e) => setForm({ ...form, ifsc: e.target.value.toUpperCase() })}
              />

              {/* Account Number */}
              <TextField
                label="Account Number"
                value={form.account}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!/^\d*$/.test(val)) return;
                  setForm({ ...form, account: val });
                }}
              />

              {/* Account Holder */}
              <TextField label="Account Holder Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

              {/* Submit */}
              <BlueButton label="Add Bank" onClick={handleAddBankAccount} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default AddBankDrawer;
