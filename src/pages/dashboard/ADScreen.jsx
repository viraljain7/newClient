import { useEffect, useState } from 'react';

// Material UI
import { Button, Grid, Stack, Typography, Box, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

// Project imports
import MainCard from 'components/MainCard';
import WalletCard from 'components/cards/statistics/WalletCard';

// Icons
import { WalletOutlined, BankOutlined, CreditCardOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons';

import { ADBalanceApi, ADServiceWiseBusiness } from './ADApi';
import { DownOutlined } from '@ant-design/icons';
import { WalletSkeleton } from './RTScreen';
import { productNameDashboard } from '../../utils/productName';

// Styles
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

// Product icon mapping
const getProductIcon = (product) => {
  const icons = {
    dmt: BankOutlined,
    bbps: DollarOutlined,
    aeps: WalletOutlined,
    pg: CreditCardOutlined,
    online_bbps: DollarOutlined,
    offline_bbps: DollarOutlined
  };

  return icons[String(product || '').toLowerCase()] || ShoppingOutlined;
};

function ADScreen() {
  const [wallets, setWallets] = useState({
    admin: {},
    downline: {}
  });

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const [filters, setFilters] = useState({
    from: today,
    to: today
  });

  // Fetch wallet data
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
      } finally {
        setLoading(true);
      }
    };

    fetchBusinessStats();
    handledate();
  }, []);

  // Date filter change
  const handleDateChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Fetch business stats
  const handledate = async () => {
    try {
      setStatsLoading(true);

      const res = await ADServiceWiseBusiness(filters);
      setStats(res?.data || []);
    } catch (error) {
      console.error('Failed to fetch business stats', error);
    } finally {
      setStatsLoading(false);
    }
  };

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

      {/* WALLET CARDS */}

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {loading ? (
          <WalletCard
            title="Main Wallet"
            count={wallets.admin.mainWallet}
            percentage={59.3}
            extra={'Downline: ' + wallets.downline.mainWallet}
            icon={WalletOutlined}
            sx={cardSX}
          />
        ) : (
          <WalletSkeleton />
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {loading ? (
          <WalletCard
            title="Settlement Wallet"
            count={wallets.admin.settlementWallet}
            percentage={70.5}
            extra={'Downline: ' + wallets.downline.settlementWallet}
            icon={BankOutlined}
            sx={cardSX}
          />
        ) : (
          <WalletSkeleton />
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {loading ? (
          <WalletCard
            title="PG Wallet"
            count={wallets.admin.pgWallet}
            percentage={27.4}
            color="warning"
            extra={'Downline: ' + wallets.downline.pgWallet}
            icon={CreditCardOutlined}
            sx={cardSX}
          />
        ) : (
          <WalletSkeleton />
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        {loading ? (
          <WalletCard
            title="AEPS Wallet"
            count={wallets.admin.aepsWallet}
            percentage={27.4}
            color="warning"
            extra={'Downline: ' + wallets.downline.aepsWallet}
            icon={DollarOutlined}
            sx={cardSX}
          />
        ) : (
          <WalletSkeleton />
        )}
      </Grid>

      {/* BUSINESS STATS FILTER */}
      <Grid size={12}>
        <Accordion
          sx={{
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',

            '&:before': {
              display: 'none'
            }
          }}
        >
          <AccordionSummary expandIcon={<DownOutlined />}>
            <Typography fontWeight={700} variant="h5">
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Button fullWidth variant="contained" onClick={handledate} disabled={statsLoading}>
                  {statsLoading ? 'Loading...' : 'Apply Filter'}
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* BUSINESS STATS CARDS */}
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          m: 0
        }}
      >
        {stats.map((item, index) => {
          const Icon = getProductIcon(item.product);

          return (
            <Grid key={item.product || index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MainCard
                content={false}
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1.5px dashed',
                  borderColor: 'divider',
                  bgcolor: '#fff',
                  transition: 'all 0.3s ease',

                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',

                    '& .business-bg-icon': {
                      opacity: 0.15,
                      transform: 'rotate(-15deg) scale(1.1)'
                    }
                  }
                }}
              >
                {/* BACKGROUND ICON - TOP RIGHT CORNER */}
                <Box
                  className="business-bg-icon"
                  sx={{
                    position: 'absolute',
                    top: -15,
                    right: -15,
                    opacity: 0.08,
                    color: 'primary.main',
                    pointerEvents: 'none',
                    transform: 'rotate(-15deg)',
                    transition: 'all 0.3s ease',
                    zIndex: 0
                  }}
                >
                  <Icon style={{ fontSize: 110 }} />
                </Box>

                {/* CARD CONTENT */}
                <Box sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
                  {/* TITLE */}
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {productNameDashboard(item.product)}
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
                    <Typography variant="body1" fontWeight={"bolder"} color="text.secondary">
                      Transactions
                    </Typography>

                    <Typography fontWeight={700} color='primary'>{item.total_txns}</Typography>
                  </Stack>
                </Box>
              </MainCard>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default ADScreen;
