import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Divider,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function PosResponseModal({ showModal, setShowModal, transactionData }) {
  const status = transactionData?.status;

  const rows = [
    { label: 'Amount', value: transactionData?.amount ? `₹ ${transactionData.amount}` : '—' },
    { label: 'Txn ID', value: transactionData?.txnid || '—' },
    { label: 'API Txn ID', value: transactionData?.apitxnid || '—' },
    { label: 'Status', value: status || '—' }
  ];

  return (
    <>
      <style>{`
        @keyframes pop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        .animate-pop { animation: pop 0.4s ease-in-out both; }
      `}</style>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            minWidth: { xs: 320, sm: 400 },
            boxShadow: 8
          }
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
            fontWeight: 600,
            fontSize: '1rem'
          }}
        >
          POS Transaction Status
          <IconButton size="small" onClick={() => setShowModal(false)} aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <Divider />

        {/* Body */}
        <DialogContent sx={{ textAlign: 'center', pt: 3 }}>
          {/* Animated icon */}
          {status === 'pending' && (
            <Box className="animate-pop" sx={{ mb: 2, display: 'inline-block', color: 'success.main' }}>
              <CheckCircleIcon size={60} />
            </Box>
          )}

          <Typography variant="subtitle1" fontWeight={700} mb={2.5}>
            Request Submitted Successfully
          </Typography>

          {/* Details card */}
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              p: 2,
              bgcolor: 'background.default',
              textAlign: 'left'
            }}
          >
            <Stack spacing={1.5}>
              {rows.map(({ label, value }, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ textTransform: label === 'Status' ? 'capitalize' : 'none' }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PosResponseModal;