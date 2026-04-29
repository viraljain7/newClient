import { Alert, Box, Card, CardContent, Grid, Typography } from '@mui/material';

function UserDetails({payoutUser}) {
  return (
    <Grid size={{ xs: 12, md: 7 }}>
      <Card
        sx={{
          border: '2px dashed #d1d5db',
          borderRadius: 3,
          height: '100%'
        }}
      >
        <CardContent>
          <Typography fontWeight={700} mb={3}>
            User Details
          </Typography>

          <Box display="flex" flexDirection="column">
            {/* Name */}
            <Row label="Full Name" value={payoutUser.aadhaar_name.toUpperCase()||"-"} />

            {/* DOB */}
            <Row label="Date of Birth" value={payoutUser.dob||"-"} />

            {/* City */}
            <Row label="City" value={payoutUser.city.toUpperCase()||"-"} />

            {/* Aadhar */}
            <Row label="Aadhar Number" value={payoutUser.aadhaar_number||"-"} />
          </Box>
        </CardContent>

        <Alert
          severity="error"
          sx={{
            fontWeight: 700,
            borderRadius: 2,
            fontSize: 14,
            alignItems: 'center'
          }}
        >
          You can add a maximum of 10 bank accounts per mobile number.
        </Alert>
      </Card>
    </Grid>
  );
}

export default UserDetails;

const Row = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" py={0.5}>
    <Typography fontSize={15} color="text.secondary">
      {label}
    </Typography>
    <Typography fontWeight={600}>{value || '-'}</Typography>
  </Box>
);
