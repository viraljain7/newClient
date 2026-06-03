import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Stack, Typography, Box, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import WalletCard from 'components/cards/statistics/WalletCard';

// icons

// avatars
import { ADBalanceApi, ADServiceWiseBusiness } from './ADApi';

import { DownOutlined } from '@ant-design/icons';

// styles
const cardSX = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none',
  letterSpacing: '1px',
  transition: 'all 0.3s ease',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
  }

};

function ADScreen() {
  const [wallets, setWallets] = useState({
    admin: {},
    downline: {}
  });

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchBusinessStats = async () => {
      try {
        const businessData = await ADBalanceApi();
        setWallets({
          admin: businessData?.adminWallets || {},
          downline: businessData?.downlineWallets || {}
        });
      } catch (error) {
        console.error('Failed to fetch business stats', error);
      }
    };

    fetchBusinessStats();
    handledate();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    from: today,
    to: today
  });

  const handleDateChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handledate = async () => {
    const res = await ADServiceWiseBusiness(filters);
    setStats(res.data);
  };

  function productName(name) {
    let productName = '';
    if (name === 'dmt') productName = 'Payout';
    else if (name === 'payu-education') productName = 'silver 1';
    else if (name === 'zwitch') productName = 'Diamond 3';
    else if (name === 'easebuzz') productName = 'silver 2';
    else if (name === 'mtb') productName = 'Add Money MTB';
    else if (name === 'qrmtb') productName = 'QR MTB';
    else if (name === 'upipayout') productName = 'UPI Payout';
    else if (name === 'bbps') productName = 'BBPS';
    else if (name === 'payout') productName = 'Bank Pay Verification';
    else if (name === 'dynamic-qr') productName = 'QR COLLECTION';
    else if (name === 'paytm_pos') productName = 'POS';
    else if (name === 'premiumpg3') productName = 'Premium 2';
    else if (name === 'diamondpg2') productName = 'Silver 2';
    else if (name === 'diamondpg3') productName = 'Diamond 2';
    // else if (name === 'cf_pg5') productName = 'Add Money (Premium 2)';
    // else if (name === 'nixapremium2') productName = 'Add Money (Premium 2)';    else if (name === 'diamondpg1') productName = 'Premium 4';
    else productName = name.toUpperCase();
    return productName;
  }

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {/* HEADER */}

      <Grid size={12}>
        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Overview & insights
        </Typography>
      </Grid>
      {/* KPI CARDS */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <WalletCard
          title="Main Wallet"
          count={wallets.admin.mainWallet}
          percentage={59.3}
          extra={'Downline: ' + wallets.downline.mainWallet}
          sx={cardSX}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <WalletCard
          title="Qr Wallet"
          count={wallets.admin.qrWallet}
          percentage={70.5}
          extra={'Downline: ' + wallets.downline.qrWallet}
          sx={cardSX}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <WalletCard
          title="PG Wallet"
          count={wallets.admin.pgWallet}
          percentage={27.4}
          color="warning"
          extra={'Downline: ' + wallets.downline.pgWallet}
          sx={cardSX}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <WalletCard
          title="Aeps Walet"
          count={wallets.admin.aepsWallet}
          percentage={27.4}
          color="warning"
          extra={'Downline: ' + wallets.downline.aepsWallet}
          sx={cardSX}
        />
      </Grid>

      {/* CHART SECTION */}

      <Accordion
        sx={{
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',

          '&:before': {
            display: 'none'
          },
          width: '100%'
        }}
        size={{ xs: 12 }}
      >
        <AccordionSummary expandIcon={<DownOutlined />}>
          <Typography fontWeight={700} variant="h5">
            {' '}
            Business Stats
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="From Date"
                name="from"
                value={filters.from}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="To Date"
                name="to"
                value={filters.to}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Button fullWidth variant="contained" onClick={handledate}>
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* CARDS */}
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          m: 0
        }}
      >
        {stats.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MainCard
              content={false}
              sx={{
                height: '100%',
                border: '1.5px dashed',
                borderColor: 'dashed',
                bgcolor: '#fff',
                transition: 'all 0.3s ease',

                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                }
              }}
            >
              <Box sx={{ p: 2.5 }}>
                {/* TITLE */}
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {productName(item.product)}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                    Business Value
                  </Typography>
                </Box>

                {/* AMOUNT */}
                <Typography
                  variant="h4"
                  fontWeight={900}
                  sx={{
                    mt: 3,
                    letterSpacing: '1px',
                    color: 'black'
                  }}
                >
                  ₹{' '}
                  {Number(item.total_amount || 0).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </Typography>

                {/* FOOTER */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    mt: 3,
                    pt: 2,
                    borderTop: '1px dashed',
                    borderColor: 'divider'
                  }}
                >
                  <Box>
                    <Typography variant="body1" color="text.secondary">
                      Transactions
                    </Typography>

                    <Typography fontWeight={700}>{item.total_txns}</Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'success.main',
                      fontWeight: 700
                    }}
                  >
                    +12.5%
                  </Typography>
                </Stack>
              </Box>
            </MainCard>
          </Grid>
        ))}
      </Grid>
      {/* ANALYTICS */}
    </Grid>
  );
}

export default ADScreen;
