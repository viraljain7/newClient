import { Box, Typography, Button, Grid, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import api from '../../../shared/BaseApi';
import { Link } from 'react-router-dom';
import { width } from '@mui/system';

function PgCharges({ group }) {
  const [ccList, setCcList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCCPrizes = async () => {
    try {
      setLoading(true);

      const res = await api.post('/master/scheme', {
        type: 'getusercommission',
        provider_type: group.providertype
      });

      const data = res.data;

      if (data?.statuscode === 'TXN') {
        setCcList(data.data || []);
      } else {
        console.error('Error:', data?.message || 'Unexpected response');
        setCcList([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setCcList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (group?.providertype) {
      fetchCCPrizes();
    }
  }, [group?.providertype]);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Box sx={cardStyle}>
        {/* Title */}
        <Typography variant="h5" fontWeight={800} textAlign="center">
          {group.title}
        </Typography>

        {/* Services */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} sx={serviceRowStyle}>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="rounded" width={50} height={20} />
                </Box>
              ))
            : ccList.map((item) => (
                <Box key={item.id} sx={serviceRowStyle}>
                  {/* Provider Name */}
                  <Typography variant="body1" fontWeight={600}>
                    {item.provider?.name}
                  </Typography>

                  {/* Charge */}
                  <Typography variant="h5" fontWeight={600} color="primary">
                    {Number(item.servicecharge).toFixed(2)}%
                  </Typography>
                </Box>
              ))}
        </Box>

        {/* Empty State */}
        {!loading && ccList.length === 0 && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No data available
          </Typography>
        )}

        {/* Button */}
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to={group.redirect}
          sx={{
            mt: 'auto',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Select'}
        </Button>
      </Box>
    </Grid>
  );
}

export default PgCharges;
const cardStyle = {
  border: '2px dashed #d1d5db',
  borderRadius: 3,
  p: 3,
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  height: '100%',
  transition: '0.3s',
  backgroundColor: '#fff',
  '&:hover': {
    transform: 'translateY(-4px)',
  }
};

const serviceRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 1,
  borderRadius: 1,
  backgroundColor: 'rgba(0,0,0,0.03)'
};
