import React from 'react';

import { Box, Card, CardContent, Container, Stack, Typography, Avatar } from '@mui/material';

import GppBadRoundedIcon from '@mui/icons-material/GppBadRounded';

function Rejected() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden'
        }}
      >
        {/* Top Gradient */}

        <Box
          sx={{
            height: 8,
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.warning.main})`
          }}
        />

        <CardContent sx={{ p: { xs: 4, md: 6 } }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            {/* Icon */}

            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'error.light',
                color: 'error.main'
              }}
            >
              <GppBadRoundedIcon sx={{ fontSize: 50 }} />
            </Avatar>

            {/* Title */}

            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                KYC Verification Rejected
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 450,
                  mx: 'auto',
                  lineHeight: 1.8,
                  fontSize: '16px'
                }}
              >
                Unfortunately, your KYC verification could not be approved. Please review the details below and resubmit your documents.
              </Typography>
            </Box>

            {/* Info Box */}

            <Box
              sx={{
                width: '100%',
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                p: 3
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '16px' }}>
                Your documents may have been rejected due to poor image quality, mismatched information, or expired documents.
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  lineHeight: 1.8,
                  fontSize: '14px'
                }}
              >
                Please ensure all documents are clear, valid, and up to date before resubmitting your KYC application.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Rejected;