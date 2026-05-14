import React from 'react';

import { Box,  Card, CardContent, Container, Stack, Typography, Avatar } from '@mui/material';

import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

function Completed() {
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
            background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`
          }}
        />

        <CardContent sx={{ p: { xs: 4, md: 6 } }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            {/* Icon */}

            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'success.light',
                color: 'success.main'
              }}
            >
              <VerifiedRoundedIcon sx={{ fontSize: 50 }} />
            </Avatar>

            {/* Title */}

            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                KYC Verification Submitted
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
                Your KYC documents have been submitted successfully and are currently under verification.
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
                Verification usually takes some time depending on document review and validation process.
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
                You will receive an update once your KYC verification has been completed.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Completed;
