import { useState } from 'react';
import { BlueButton, PendingChip, SuccessChip } from '../../../../components/CommonComponent';
import { Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddBankDrawer from './AddBankDrawer';
import TransferPayout from './TransferPayout';
// ✅ Updated data structure

export default function BeniListTable({ payoutUser, setLoading, setPayoutUser }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [userData,setUserData]=useState(null)

  const handlePaymentTransfer=(row)=>{
setUserData(row);
setOpenTransfer(true);
  }

  return (
    <Card sx={{ border: '2px dashed #d1d5db', borderRadius: 3 }}>
      {/* 🔹 Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ p: 2 }}>
        <Typography fontWeight={700}> Payout Beneficiary List</Typography>

        <BlueButton
          label="+ Add Bank"
          sx={{
            width: 'auto'
          }}
          onClick={() => setOpenDrawer(true)}
        />
      </Box>
      <TableContainer
        sx={{
          overflowX: 'auto'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f3f4f6' }}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>Account No.</TableCell>
              <TableCell>IFSC</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payoutUser && payoutUser.length > 1 ? (
              payoutUser
                .filter((_, idx) => idx > 0)
                .map((row, i) => (
                  <TableRow key={row.id || i}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.bankname}</TableCell>
                    <TableCell>{row.accountno}</TableCell>
                    <TableCell>{row.ifsccode}</TableCell>
                    <TableCell align="center">
                      {row.is_verified === '1' ? (
                        <SuccessChip label="pay" onClick={()=>handlePaymentTransfer(row)} />
                      ) : (
                        <PendingChip label="verify" />
                      )}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ fontWeight: 800 }}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddBankDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        payoutUser={payoutUser}
        setPayoutUser={setPayoutUser}
        setLoading={setLoading}
      />
      <TransferPayout open={openTransfer} onClose={() => setOpenTransfer(false)} userData={userData} setLoading={setLoading} />
    </Card>
  );
}
