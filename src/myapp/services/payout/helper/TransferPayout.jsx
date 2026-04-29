import React, { useEffect, useState } from 'react';
import { Drawer, Box, Card, CardContent, Typography, IconButton, TextField, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { BlueButton } from '../../../../components/CommonComponent';
import { useSelector } from 'react-redux';
import { makePayoutTxn } from '../payoutApi';

function TransferPayout({ open, onClose, userData, setLoading }) {
  const user = useSelector((state) => state.user.profile);
  const [form, setForm] = useState({
    id: '',
    bank: '',
    ifsc: '',
    account: '',
    name: '',
    transferType: '',
    amount: ''
  });

  // ✅ Prefill when userData comes
  useEffect(() => {
    if (userData) {
      setForm({
        id:userData.id||"",
        bank: userData.bankname || '',
        ifsc: userData.ifsccode || '',
        account: userData.accountno || '',
        name: userData.name || '',
        transferType: '',
        amount: ''
      });
    }
  }, [userData]);

  const handleSubmit = async () => {
    setLoading(true);
    const newTxnId = `T${user?.id}${Date.now()}`;

    const { id, bank, ifsc, account, name, transferType, amount } = form;

    if (!bank || !ifsc || !account || !name || !transferType || !amount || !id) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    if (Number(amount) <= 0) {
      toast.error('Enter valid amount');
      setLoading(false);

      return;
    }

    const res = await makePayoutTxn(id, newTxnId, Number(amount), transferType);

    if (res.statuscode === 'TXN') {
      toast.success(res.message);

      onClose();
      setForm({
        id: '',
        bank: '',
        ifsc: '',
        account: '',
        name: '',
        transferType: '',
        amount: ''
      });
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, height: '100%' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            {/* Header */}
            <Box position="relative" mb={4}>
              <Typography fontWeight={700}>Transfer Payout</Typography>

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
              {/* Bank Name */}
              <TextField
                label="Bank Name"
                value={form.bank}
                onChange={(e) => setForm({ ...form, bank: e.target.value })}
                sx={{
                  color: 'black'
                }}
                disabled
              />

              {/* IFSC */}
              <TextField
                label="IFSC Code"
                value={form.ifsc}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ifsc: e.target.value.toUpperCase()
                  })
                }
                disabled
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
                disabled
              />

              {/* Account Holder */}
              <TextField
                label="Account Holder Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled
              />

              {/* Transfer Type */}
              <TextField
                select
                label="Transfer Type"
                value={form.transferType}
                onChange={(e) => setForm({ ...form, transferType: e.target.value })}
              >
                <MenuItem value="IMPS">IMPS</MenuItem>
                <MenuItem value="NEFT">NEFT</MenuItem>
                <MenuItem value="RTGS">RTGS</MenuItem>
              </TextField>

              {/* Amount */}
              <TextField
                label="Amount"
                value={form.amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!/^\d*$/.test(val)) return;
                  setForm({ ...form, amount: val });
                }}
              />

              {/* Submit */}
              <BlueButton label="Transfer Now" onClick={handleSubmit} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default TransferPayout;
