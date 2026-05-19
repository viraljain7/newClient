import { useEffect, useState } from 'react';

// material-ui
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Box
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// icons

import MaxWidthDialog from '../../myapp/kyc';
import { useSelector } from 'react-redux';

import {
  CalendarOutlined,
  FundOutlined,
  RiseOutlined,
  BarChartOutlined,
  SendOutlined,
  QrcodeOutlined,
  ApiOutlined,
  CreditCardOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router';
import { RTBussinessStats } from './RTApi';
import AllTransactionReport from '../../myapp/trns-report/all-txn-report';

// styles
const avatarSX = { width: 32, height: 32 };
const cardSX = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none'
};

export default function RTScreen() {
  const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
  const user = useSelector((state) => state.user.profile);
  const activeService = useSelector((state) => state.user.service);
  const [bussinesStats, setBussinesStats] = useState([]);

  useEffect(() => {
    const fetchBusinessStats = async () => {
      try {
        const businessData = await RTBussinessStats();
        setBussinesStats(businessData?.data || []);
      } catch (error) {
        console.error('Failed to fetch business stats', error);
      }
    };

    fetchBusinessStats();
  }, []);

  const services = [
    {
      title: 'Payout',
      subtitle: 'Instant Transfer',
      icon: <SendOutlined />,
      color: '#2563eb',
      bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
      redirect: '/services/payout',
      serviceCode: 'domesticrem'
    },

    {
      title: 'Credit Card',
      subtitle: 'Bill Payments',
      icon: <CreditCardOutlined />,
      color: '#059669',
      bg: 'linear-gradient(135deg,#ecfdf5,#d1fae5)',
      redirect: '/services/bbps',
      serviceCode: 'creditcard-online'
    },

    {
      title: 'Rupay UPI',
      subtitle: 'UPI Collection',
      icon: <QrcodeOutlined />,
      color: '#ea580c',
      bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)',
      redirect: '/services/rupay-upi',
      serviceCode: 'rupayupi'
    },

    {
      title: 'Payment Gateway',
      subtitle: 'Money Collection',
      icon: <ApiOutlined />,
      color: '#7c3aed',
      bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)',
      redirect: '/services/add-money',
      serviceCode: 'addmoney'
    }
  ];

  const filteredServices = services.filter((item) =>
    activeService?.some((service) => service.code === item.serviceCode && service.value === '1')
  );

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {user?.kyc !== 'verified' && <MaxWidthDialog />}
      {/* HEADER */}
      <Grid size={12}>
        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>
      </Grid>
      {/* KPI CARDS */}
      <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
        <AnalyticEcommerce title="Main Wallet" count={'₹ ' + user?.mainbalance} percentage={59.3} extra="35k" sx={cardSX} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
        <AnalyticEcommerce
          title="Aeps Wallet"
          count={'₹ ' + user?.aepsbalance}
          percentage={27.4}
          color="warning"
          extra="1,943"
          sx={cardSX}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
        <AnalyticEcommerce title="UPI Wallet" count={'₹ ' + user?.qrbalance} percentage={70.5} extra="8.9k" sx={cardSX} />
      </Grid>

      {/* TABLE */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Services
          </Typography>

          <IconButton size="small" onClick={(e) => setOrderMenuAnchor(e.currentTarget)}>
            <EllipsisOutlined style={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <MainCard
          sx={{
            ...cardSX,
            mt: 1,
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Grid container spacing={2}>
            {filteredServices.map((item) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    p: 2.2,
                    borderRadius: 2,
                    background: item.bg,
                    border: '1px solid rgba(255,255,255,0.4)',
                    transition: 'all .3s ease',
                    cursor: 'pointer',

                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    },

                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.35)'
                    }
                  }}
                >
                  <NavLink
                    to={item.redirect}
                    style={{
                      textDecoration: 'none',
                      display: 'block'
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* Content */}
                      <Box sx={{ zIndex: 2 }}>
                        <Typography fontWeight={700} fontSize={16} color="#111827">
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.5,
                            color: 'text.secondary'
                          }}
                          fontWeight={600}
                          fontSize={14}
                        >
                          {item.subtitle}
                        </Typography>
                      </Box>

                      {/* Icon */}
                      <Box
                        sx={{
                          width: 58,
                          height: 58,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(255,255,255,0.7)',
                          backdropFilter: 'blur(10px)',
                          color: item.color,
                          fontSize: 28,
                          zIndex: 2,
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}
                      >
                        {item.icon}
                      </Box>
                    </Stack>
                  </NavLink>
                </Box>
              </Grid>
            ))}
          </Grid>
        </MainCard>
      </Grid>

      {/* ANALYTICS */}

      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <MainCard sx={cardSX} content={false}>
          <List sx={{ p: 0 }}>
            {/* TODAY */}
            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    ...avatarSX,
                    bgcolor: 'success.lighter',
                    color: 'success.main'
                  }}
                >
                  <CalendarOutlined />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary="Today Business"
                secondary="Today's Collection"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: 15
                }}
              />

              <Typography fontWeight={700} color="success.main">
                ₹{bussinesStats.today_business}
              </Typography>
            </ListItemButton>

            {/* THIS MONTH */}
            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    ...avatarSX,
                    bgcolor: 'primary.lighter',
                    color: 'primary.main'
                  }}
                >
                  <FundOutlined />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary="This Month"
                secondary="Current Month Business"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: 15
                }}
              />

              <Typography fontWeight={700} color="primary.main">
                ₹{bussinesStats.this_month_business}
              </Typography>
            </ListItemButton>

            {/* LAST MONTH */}
            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    ...avatarSX,
                    bgcolor: 'warning.lighter',
                    color: 'warning.main'
                  }}
                >
                  <BarChartOutlined />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary="Last Month"
                secondary="Previous Month Business"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: 15
                }}
              />

              <Typography fontWeight={700} color="warning.main">
                ₹{bussinesStats.last_month_business}
              </Typography>
            </ListItemButton>

            {/* THIS YEAR */}
            <ListItemButton sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    ...avatarSX,
                    bgcolor: 'error.lighter',
                    color: 'error.main'
                  }}
                >
                  <RiseOutlined />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary="This Year"
                secondary="Yearly Business Growth"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: 15
                }}
              />

              <Typography fontWeight={700} color="error.main">
                ₹{bussinesStats.this_year_business}
              </Typography>
            </ListItemButton>
          </List>
        </MainCard>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <MainCard sx={{ ...cardSX, mt: 1, p: 2 }} content={false}>
          <AllTransactionReport />
        </MainCard>
      </Grid>
    </Grid>
  );
}
